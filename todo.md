# TODO: Core Functionalities for Find Your Lawyer Platform

## ✅ 1. Login/Signup System with Clerk

- [ ] Integrate Clerk for authentication in both login and signup pages.
- [ ] Configure Clerk project and environment variables.
- [ ] Separate user data (clients) and lawyer data in the database:
  - Create `User` and `Lawyer` models in `schema.prisma`.
  - On successful registration, insert data into the appropriate collection.
- [ ] Sync Clerk user metadata with MongoDB on signup/login.
- [ ] Validate and handle edge cases (duplicate emails, invalid data, etc.).

## ✅ 2. Real-Time Booking Integration

- [ ] Build a real-time booking interface with calendar integration.
- [ ] Save all booking data to MongoDB:
  - Booking ID
  - User ID
  - Lawyer ID
  - Date & Time
  - Booking status
- [ ] Replace all mock booking data from `mockData.ts` with real data fetched from the database.
- [ ] Ensure data consistency between client, lawyer, and admin dashboards.

## ✅ 3. Bangladeshi Payment System Integration (Amarpay)

- [ ] Use demo endpoint from [Amarpay API Docs](https://aamarpay.readme.io/reference/initiate-payment-json).
- [ ] Create payment initiation function with necessary payloads:
  - Amount, invoice ID, success/fail/cancel URLs
- [ ] Save payment details in MongoDB:
  - Transaction ID, Amount, Status, Timestamp, User ID
- [ ] Handle response from Amarpay (success/failure/cancel callbacks).
- [ ] Show transaction history in dashboards (client, lawyer, admin).

## ✅ 4. Dashboard Updates (Client, Lawyer, Admin)

- [ ] Remove all hardcoded/demo data from:
  - Admin Dashboard
  - Lawyer Dashboard
  - Client Dashboard
- [ ] Fetch real data from MongoDB:
  - Upcoming bookings
  - Completed bookings
  - Payment summaries
  - User/lawyer profile details
- [ ] Add pagination and filtering if necessary.

## ✅ 5. Video Calling Integration

- [ ] Use free WebRTC-based technology (suggested: [LiveKit](https://livekit.io/) or [Daily.co Free Tier]).
- [ ] Implement join-room and create-room functionality with dynamic call/room ID.
- [ ] Enable video/audio stream between client and lawyer.
- [ ] Save video call metadata (duration, participants, timestamps) in MongoDB.

---

# 🔧 Database Setup Instructions

## ✅ Create a `.env` file

```bash
touch .env
```
