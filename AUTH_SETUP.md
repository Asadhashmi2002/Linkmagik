# JWT Authentication Setup

## Default Credentials
- **Email**: `asadalihashmi2002@gmail.com`
- **Password**: `asad123`

## Environment Variables (Optional)
Add these to your `.env.local` file to customize:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_USERNAME=asadalihashmi2002@gmail.com
ADMIN_PASSWORD=asad123
```

## How It Works

### Protected Routes (Require Login)
- `/dashboard` - Main admin panel for creating short links
- `/api/links` - API for managing links
- All other routes except public ones

### Public Routes (No Login Required)
- `/login` - Login page
- `/api/auth/login` - Login API
- `/api/auth/logout` - Logout API
- `/api/redirect/*` - Redirect API (for short links)
- `/ad` - First ad page
- `/ad-2` - Second ad page
- `/redirect/*` - Redirect pages

## User Flow

1. **Admin Access**: You login at `/login` with your email and password
2. **Create Links**: Use the dashboard to create short links
3. **Public Access**: Users can click your short links without any login
4. **Ad Flow**: Users see ads and get redirected to the original URL

## Security Features

- JWT tokens stored in HTTP-only cookies
- 24-hour session expiration
- Middleware protection for all admin routes
- Public access to redirect and ad pages

## Testing

1. Visit `http://localhost:9002/login`
2. Login with:
   - Email: `asadalihashmi2002@gmail.com`
   - Password: `asad123`
3. You'll be redirected to `/dashboard` where you can create short links
4. Users clicking your short links will see ads without needing to login
