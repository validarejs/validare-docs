/**
 * Builds the srcdoc HTML string for the ValidarePlayground iframe.
 *
 * The closing </script> sequences are assembled at runtime so that the
 * Vue SFC compiler never sees the literal token </script> inside a
 * <script> block, which would cause a parse error.
 */
const CLOSE_SCRIPT = '<' + '/script>'

export function buildSrcdoc(validareSource: string, userCode: string): string {
  // Escape </script> inside validareSource and userCode to avoid premature
  // end-of-script in the iframe HTML parser.
  const safeSource = validareSource.replace(/<\/script>/gi, '<\\/script>')
  // Intercept the validare() call so the Core instance is stored in window.__fv,
  // enabling the submit handler below to call fv.validate() when the button is clicked.
  const instrumentedCode = userCode.replace(
    /\bvalidare\s*\(/,
    'window.__fv = validare('
  )
  const safeUser = instrumentedCode.replace(/<\/script>/gi, '<\\/script>')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
*,*::before,*::after{box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:1rem;margin:0;font-size:14px}
.field{margin-bottom:1rem}
fieldset.field{border:1px solid #ccc;padding:.5rem .75rem;border-radius:4px}
legend{font-weight:500;padding:0 .25rem}
label{display:block;margin-bottom:.25rem;font-weight:500}
input[type=text],input[type=email],input[type=password],input[type=number],
input[type=url],input[type=tel],input[type=file],select{
  display:block;width:100%;padding:.375rem .75rem;border:1px solid #ccc;
  border-radius:4px;font-size:14px}
input.fv-valid{border-color:#198754}
input.fv-invalid{border-color:#dc3545}
.fv-plugins-message-container{color:#dc3545;font-size:.8125rem;margin-top:.25rem;min-height:1.2em}
button[type=submit]{padding:.375rem .75rem;background:#0d6efd;color:#fff;
  border:none;border-radius:4px;cursor:pointer;font-size:14px}
button[type=submit]:disabled{opacity:.6;cursor:not-allowed}
</style>
</head>
<body>
<script>${safeSource}${CLOSE_SCRIPT}
<script>
window.onerror=function(m,s,l,c,e){
  parent.postMessage({type:'pg-error',msg:String(e||m)},'*');
  return true;
};
// Intercept form submit: prevent navigation (sandbox has no allow-forms)
// and trigger programmatic validation via the stored Core instance.
document.addEventListener('submit',function(e){
  e.preventDefault();
  if(window.__fv) window.__fv.validate();
},true);
try{${safeUser}}catch(e){parent.postMessage({type:'pg-error',msg:String(e)},'*');}
${CLOSE_SCRIPT}
</body>
</html>`
}
