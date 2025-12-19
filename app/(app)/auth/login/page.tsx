export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 border rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}