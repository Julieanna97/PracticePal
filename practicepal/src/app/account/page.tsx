// app/account/page.tsx
export default function AccountPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Account</h1>
          <p className="mt-2 text-gray-600">
            Manage your profile, subscription, and settings
          </p>
        </div>

        {/* Account sections placeholder */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
            <p className="mt-2 text-sm text-gray-600">
              Coming soon: name, email, profile picture
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Subscription Status</h2>
            <p className="mt-2 text-sm text-gray-600">
              Coming soon: current plan, billing info, manage subscription
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Settings</h2>
            <p className="mt-2 text-sm text-gray-600">
              Coming soon: notifications, privacy, preferences
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Account Actions</h2>
            <p className="mt-2 text-sm text-gray-600">
              Coming soon: logout, delete account
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}