# MDIT 2025 License Redemption System

A secure license redemption system for workshop attendees with domain-restricted API access.

## 🚀 Features

- **Domain Restriction**: API only accessible from mdit2025.my and its subdomains
- **IC Number Validation**: Proper Malaysian IC format validation
- **Secure Database**: Row Level Security (RLS) policies for data protection
- **Real-time Feedback**: Toast notifications and loading states
- **Responsive Design**: Mobile-friendly interface
- **Copy to Clipboard**: Easy license key copying functionality
- **Audit Logging**: Track redemption attempts and status

## 📋 Database Schema

### Tables

1. **license_redemption**
   - `id`: UUID primary key
   - `ic_number`: VARCHAR(15) UNIQUE - Malaysian IC format
   - `license_key`: VARCHAR(255) - Software license key
   - `created_at`: Timestamp when record was created
   - `redeemed_at`: Timestamp when license was redeemed
   - `is_redeemed`: Boolean flag for redemption status

## 🔧 Setup Instructions

### 1. Database Setup (Supabase)

1. Create a new Supabase project
2. Go to SQL Editor and run the schema from `database/schema.sql`
3. The schema includes:
   - Table creation with proper indexes
   - Row Level Security (RLS) policies
   - Domain validation stored function
   - Sample test data

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

```bash
npm install @supabase/supabase-js sonner
```

### 4. Domain Configuration

The system is configured to only allow access from:

- `https://www.mdit2025.my`
- `https://any-subdomain.mdit2025.my`
- `localhost` (development only)

## 🔒 Security Features

### Domain Restriction

- **Origin Header Validation**: Checks the `Origin` header
- **Referer Header Validation**: Fallback to `Referer` header
- **Regex Pattern Matching**: Uses regex to validate domain patterns
- **Development Exception**: Allows localhost for development

### Database Security

- **Row Level Security (RLS)**: Enabled on all tables
- **Domain-based Policies**: SQL policies check request headers
- **Secure Functions**: SECURITY DEFINER functions for controlled access
- **Input Validation**: Proper IC number format validation

## 📝 API Usage

### Endpoint: `/api/redeem-license`

**Method**: POST

**Headers**:

```
Content-Type: application/json
Origin: https://www.mdit2025.my
```

**Request Body**:

```json
{
  "icNumber": "123456-78-9012"
}
```

**Success Response**:

```json
{
  "success": true,
  "license_key": "MDIT-2025-WORKSHOP1-ABCD1234",
  "already_redeemed": false,
  "error": null
}
```

**Error Response**:

```json
{
  "success": false,
  "error": "IC number not found. Please verify your IC number or contact support.",
  "license_key": null
}
```

## 🧪 Testing

### Sample Test Data

The schema includes sample IC numbers for testing:

- `123456-78-9012` → `MDIT-2025-WORKSHOP1-ABCD1234`
- `234567-89-0123` → `MDIT-2025-WORKSHOP1-EFGH5678`
- `345678-90-1234` → `MDIT-2025-WORKSHOP1-IJKL9012`

### Test Cases

1. **Valid IC Number**: Should return license key
2. **Invalid IC Number**: Should return error message
3. **Already Redeemed**: Should return existing license key with flag
4. **Invalid Domain**: Should return 403 Forbidden
5. **Invalid Format**: Should return validation error

## 🔧 Customization

### Adding More License Keys

```sql
INSERT INTO license_redemption (ic_number, license_key) VALUES
('NEW-IC-NUMBER', 'NEW-LICENSE-KEY');
```

### Updating Domain Restrictions

Modify the domain validation in:

1. `app/api/redeem-license/route.ts` (API validation)
2. `database/schema.sql` (Database policies)

### Custom Error Messages

Update error messages in the stored function or API route as needed.

## 🚨 Error Handling

The system handles various error scenarios:

- **IC Not Found**: Clear message with support contact
- **Already Redeemed**: Shows existing license key
- **Network Errors**: Graceful error handling with retry option
- **Domain Restrictions**: Proper 403 responses
- **Invalid Format**: Client-side validation with helpful messages

## 📱 User Experience

- **Progressive Enhancement**: Works without JavaScript (basic functionality)
- **Loading States**: Visual feedback during API calls
- **Toast Notifications**: Success/error messages
- **Copy to Clipboard**: One-click license key copying
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔍 Monitoring & Analytics

- **Audit Logging**: All redemption attempts are logged
- **Error Tracking**: Failed attempts with error details
- **Usage Statistics**: Track redemption patterns
- **Security Monitoring**: Invalid domain access attempts

## 📞 Support

For support or questions:

- Email: mditxdd2025@gmail.com
- The system includes built-in error messages guiding users to contact support when needed

## 🔄 Future Enhancements

Potential improvements:

1. **Rate Limiting**: Prevent abuse with rate limiting
2. **Email Notifications**: Send license keys via email
3. **Bulk Import**: Admin interface for importing IC numbers
4. **Analytics Dashboard**: View redemption statistics
5. **Multi-Workshop Support**: Support for different workshop types
