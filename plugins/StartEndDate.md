---
outline: deep
---

# `StartEndDate` Plugin

Ensures a start date field is on or before an end date field. Automatically cross-revalidates both fields when either changes.

## Options

| Option | Type | Description |
|---|---|---|
| `format` | `string` | Date format string. Supported tokens: `YYYY`, `MM`, `DD`. Separator: `-` or `/`. |
| `startDate.field` | `string` | Name of the start date field |
| `startDate.message` | `string` | Error message shown on the start field when start > end |
| `endDate.field` | `string` | Name of the end date field |
| `endDate.message` | `string` | Error message shown on the end field when end < start |

### Supported formats

| Format | Example |
|---|---|
| `YYYY-MM-DD` | `2025-12-31` |
| `DD/MM/YYYY` | `31/12/2025` |
| `MM/DD/YYYY` | `12/31/2025` |
| `YYYY/MM/DD` | `2025/12/31` |

## Playground

<script setup>
const code = `document.body.innerHTML = \`
  <form id="demo" novalidate>
    <div class="field">
      <label>Check-in date</label>
      <input type="date" name="checkin">
      <div class="vd-plugins-message-container"></div>
    </div>
    <div class="field">
      <label>Check-out date</label>
      <input type="date" name="checkout">
      <div class="vd-plugins-message-container"></div>
    </div>
    <button type="submit">Validate</button>
  </form>
\`;
const { validare, Trigger, Message, StartEndDate } = Validare;
validare(document.getElementById('demo'), {
  fields: {
    checkin:  { validators: { notEmpty: { message: 'Check-in date is required' } } },
    checkout: { validators: { notEmpty: { message: 'Check-out date is required' } } }
  },
  plugins: {
    trigger:   new Trigger({ event: 'change' }),
    message:   new Message(),
    dateRange: new StartEndDate({
      format: 'YYYY-MM-DD',
      startDate: { field: 'checkin',  message: 'Check-in must be on or before check-out' },
      endDate:   { field: 'checkout', message: 'Check-out must be on or after check-in' }
    })
  }
});`
</script>

<ValidarePlayground :code="code" height="360px" />

## Notes

- Cross-revalidation is automatic: when either field changes and validates, the other is revalidated immediately.
- If either field is empty, the constraint is not applied (defers to `notEmpty` or `date` validators).
- Invalid calendar dates (e.g. February 30) are treated as unparseable — the cross-field constraint is skipped.
- Equal dates are valid (inclusive comparison: start ≤ end).
- Multiple `StartEndDate` instances on the same form are supported (each instance has a unique internal key).
