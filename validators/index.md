# Validators

Validare ships 51 built-in validators across 7 categories.
All validators pass on empty string — combine with [`notEmpty`](/validators/notEmpty) to require a value.

## Core (23)

| Validator | Description |
|---|---|
| [notEmpty](/validators/notEmpty) | Not empty (supports `trim`) |
| [blank](/validators/blank) | Empty (opposite of `notEmpty`, supports `trim`) |
| [email](/validators/email) | Valid email address |
| [creditCard](/validators/creditCard) | Credit card number (Luhn check) |
| [date](/validators/date) | Date in a specified format |
| [digits](/validators/digits) | Digits only |
| [integer](/validators/integer) | Integer (positive or negative) |
| [numeric](/validators/numeric) | Numeric value |
| [regexp](/validators/regexp) | Matches a regular expression |
| [uri](/validators/uri) | Valid URL |
| [identical](/validators/identical) | Equal to another field |
| [different](/validators/different) | Different from another field |
| [between](/validators/between) | Between min and max |
| [greaterThan](/validators/greaterThan) | Greater than (or equal to) a value |
| [lessThan](/validators/lessThan) | Less than (or equal to) a value |
| [stringLength](/validators/stringLength) | String length (min/max) |
| [stringCase](/validators/stringCase) | Uppercase or lowercase |
| [choice](/validators/choice) | Number of checked checkboxes |
| [file](/validators/file) | File type and size |
| [callback](/validators/callback) | Custom synchronous function |
| [promise](/validators/promise) | Custom async function |
| [remote](/validators/remote) | Remote validation via HTTP |
| [ip](/validators/ip) | IP address (IPv4 and IPv6) |

## Format & Encoding (6)

| Validator | Description |
|---|---|
| [base64](/validators/base64) | Base64-encoded string |
| [hex](/validators/hex) | Hexadecimal number |
| [mac](/validators/mac) | MAC address |
| [bic](/validators/bic) | BIC/SWIFT code |
| [uuid](/validators/uuid) | UUID (v3, v4, v5) |
| [color](/validators/color) | CSS color (#hex, rgb, hsl, named) |

## Financial Instruments (6)

| Validator | Description |
|---|---|
| [iban](/validators/iban) | IBAN (77 countries) |
| [vat](/validators/vat) | VAT number (requires `country`) |
| [cusip](/validators/cusip) | CUSIP (North American securities) |
| [isin](/validators/isin) | ISIN (International Securities Identification Number) |
| [sedol](/validators/sedol) | SEDOL (London Stock Exchange) |
| [grid](/validators/grid) | GRId (Global Release Identifier) |

## Publication Codes (4)

| Validator | Description |
|---|---|
| [ean](/validators/ean) | EAN barcode (EAN-8 and EAN-13) |
| [isbn](/validators/isbn) | ISBN-10 and ISBN-13 |
| [ismn](/validators/ismn) | ISMN (International Standard Music Number) |
| [issn](/validators/issn) | ISSN (International Standard Serial Number) |

## Device & Vehicle (5)

| Validator | Description |
|---|---|
| [imei](/validators/imei) | IMEI (mobile device identifier) |
| [imo](/validators/imo) | IMO vessel number |
| [meid](/validators/meid) | MEID (CDMA device identifier) |
| [step](/validators/step) | Multiple of a step value |
| [vin](/validators/vin) | VIN (Vehicle Identification Number, USA) |

## Tax & Business (4)

| Validator | Description |
|---|---|
| [ein](/validators/ein) | EIN (US Employer Identification Number) |
| [rtn](/validators/rtn) | RTN (US Routing Transit Number) |
| [siren](/validators/siren) | SIREN (French company identifier) |
| [siret](/validators/siret) | SIRET (French establishment identifier) |

## Identity & Geographic (3)

| Validator | Description |
|---|---|
| [id](/validators/id) | National ID number (42 countries, requires `country`) |
| [phone](/validators/phone) | Phone number (requires `country`) |
| [zipCode](/validators/zipCode) | Postal/ZIP code (requires `country`) |
