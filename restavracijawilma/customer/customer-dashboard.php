
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Customer Dashboard | Restavracija Wilma</title>

  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'slovenia-green': '#263d2c',
            'slovenia-lightgreen': '#405b43',
            'slovenia-dark': '#17251b',
            'slovenia-gold': '#c5a66a'
          }
        }
      }
    };
  </script>

  <style>
    body {
      background: #f7f6f2;
      font-family: Arial, sans-serif;
    }

    .nav-link.active {
      background: #263d2c;
      color: #fff;
    }

    .nav-link {
      transition: all .25s ease;
    }

    .nav-link:hover {
      background: #e9ece6;
      color: #263d2c;
    }

    .nav-link.active:hover {
      background: #405b43;
      color: #fff;
    }
  </style>
</head>

<body class="min-h-screen text-gray-800">

<div class="min-h-screen md:flex">

  <!-- Sidebar -->
  <aside class="w-full md:w-64 bg-slovenia-dark text-white md:min-h-screen md:flex md:flex-col">

    <div class="p-6 border-b border-white/10">
      <a href="index.php" class="flex items-center gap-3">
        <img src="images/footer-logo.jpeg"
             alt="Restavracija Wilma"
             class="w-36 h-16 object-contain bg-white rounded-lg p-1">
      </a>

      <p class="text-slovenia-gold text-xs mt-3 tracking-widest uppercase">
        Customer Portal
      </p>
    </div>

    <nav class="p-4 grid grid-cols-2 md:grid-cols-1 gap-2">
      <button type="button" data-page="overview"
        class="nav-link active text-left px-4 py-3 rounded-lg">
        <i class="fa-solid fa-house w-6"></i> Overview
      </button>

      <button type="button" data-page="book"
        class="nav-link text-left px-4 py-3 rounded-lg">
        <i class="fa-solid fa-calendar-plus w-6"></i> Book a Table
      </button>

      <button type="button" data-page="reservations"
        class="nav-link text-left px-4 py-3 rounded-lg">
        <i class="fa-solid fa-calendar-check w-6"></i> My Reservations
      </button>

      <button type="button" data-page="profile"
        class="nav-link text-left px-4 py-3 rounded-lg">
        <i class="fa-solid fa-user w-6"></i> My Profile
      </button>
    </nav>

    <div class="p-4 mt-auto hidden md:block">
      <div class="rounded-xl border border-white/10 p-4">
        <i class="fa-solid fa-utensils text-slovenia-gold text-xl"></i>
        <p class="font-semibold mt-3">A wonderful dining experience</p>
        <p class="text-xs text-gray-400 mt-2">
          Reserve your table and let us take care of the rest.
        </p>
      </div>

      <a href="index.php"
         class="block text-sm text-gray-300 hover:text-slovenia-gold mt-5 px-2">
        <i class="fa-solid fa-arrow-left mr-2"></i> Back to Website
      </a>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 min-w-0">

    <!-- Top Bar -->
    <header class="bg-white border-b border-gray-200 px-5 md:px-8 py-4
                   flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-xs text-gray-500">RESTAVRACIJA WILMA</p>
        <h1 id="pageTitle" class="text-xl md:text-2xl font-bold mt-1">
          Customer Dashboard
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-slovenia-green text-white
                    flex items-center justify-center">
          <i class="fa-solid fa-user"></i>
        </div>

        <div>
          <p id="topName" class="font-semibold text-sm">Customer</p>
          <p class="text-xs text-gray-500">Guest Account</p>
        </div>

        <button id="logoutBtn"
          class="ml-2 text-sm text-red-600 hover:text-red-800"
          type="button" title="Logout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </header>

    <div class="p-5 md:p-8 max-w-7xl mx-auto">

      <div id="notice" role="status" aria-live="polite"
           class="hidden mb-5 p-4 rounded-xl text-sm"></div>

      <!-- Overview -->
      <section id="overviewPage" class="page-section">

        <div class="rounded-2xl bg-slovenia-dark text-white p-6 md:p-9
                    relative overflow-hidden">
          <div class="relative z-10 max-w-2xl">
            <p class="text-slovenia-gold text-sm tracking-widest uppercase">
              Welcome back
            </p>

            <h2 class="text-3xl md:text-4xl font-bold mt-3">
              Hello, <span id="welcomeName">Guest</span>!
            </h2>

            <p class="text-gray-300 mt-3 leading-relaxed">
              Your next memorable dining experience starts here.
              Book your table and manage all your reservations in one place.
            </p>

            <button type="button" data-go="book"
              class="mt-6 bg-slovenia-gold hover:bg-white text-slovenia-dark
                     font-semibold px-6 py-3 rounded-lg transition">
              <i class="fa-solid fa-calendar-plus mr-2"></i>
              Reserve a Table
            </button>
          </div>

          <i class="fa-solid fa-utensils absolute -right-4 -bottom-8
                    text-white/5 text-9xl"></i>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

          <div class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-500">Total Reservations</p>
              <i class="fa-solid fa-calendar-days text-slovenia-gold text-xl"></i>
            </div>
            <p id="totalCount" class="text-3xl font-bold mt-4">0</p>
            <p class="text-xs text-gray-500 mt-1">Your booking history</p>
          </div>

          <div class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-500">Pending Approval</p>
              <i class="fa-solid fa-clock text-amber-500 text-xl"></i>
            </div>
            <p id="pendingCount" class="text-3xl font-bold mt-4">0</p>
            <p class="text-xs text-gray-500 mt-1">Awaiting restaurant review</p>
          </div>

          <div class="bg-white rounded-xl border border-gray-200 p-5">
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-500">Approved</p>
              <i class="fa-solid fa-circle-check text-green-600 text-xl"></i>
            </div>
            <p id="approvedCount" class="text-3xl font-bold mt-4">0</p>
            <p class="text-xs text-gray-500 mt-1">Confirmed reservations</p>
          </div>
        </div>

        <!-- Recent Reservations -->
        <div class="bg-white rounded-xl border border-gray-200 mt-6 overflow-hidden">
          <div class="p-5 flex items-center justify-between gap-3 border-b">
            <div>
              <h3 class="font-bold text-lg">Recent Reservations</h3>
              <p class="text-sm text-gray-500 mt-1">Your latest booking requests</p>
            </div>
            <button type="button" data-go="reservations"
              class="text-sm font-semibold text-slovenia-green hover:underline">
              View All
            </button>
          </div>

          <div id="recentBookings" class="p-5">
            <p class="text-sm text-gray-500">Loading reservations...</p>
          </div>
        </div>

      </section>

      <!-- New Booking -->
      <section id="bookPage" class="page-section hidden">
        <div class="bg-white rounded-2xl border border-gray-200 p-5 md:p-8">
          <h2 class="text-2xl font-bold">Reserve Your Table</h2>
          <p class="text-sm text-gray-500 mt-2">
            Send your request. Your reservation will be confirmed after approval.
          </p>

          <form id="bookingForm" class="mt-7 space-y-5">

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="bookingDate" class="block text-sm font-semibold mb-2">
                  Reservation Date *
                </label>
                <input id="bookingDate" name="date" type="date" required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-slovenia-green">
              </div>

              <div>
                <label for="bookingTime" class="block text-sm font-semibold mb-2">
                  Preferred Time *
                </label>
                <input id="bookingTime" name="time" type="time" required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-slovenia-green">
              </div>

              <div>
                <label for="guestCount" class="block text-sm font-semibold mb-2">
                  Number of Guests *
                </label>
                <select id="guestCount" name="guests" required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3">
                  <option value="1">1 Guest</option>
                  <option value="2" selected>2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="7">7 Guests</option>
                  <option value="8">8 Guests</option>
                  <option value="9">9 Guests</option>
                  <option value="10">10 Guests</option>
                </select>
              </div>

              <div>
                <label for="occasion" class="block text-sm font-semibold mb-2">
                  Occasion
                </label>
                <select id="occasion" name="occasion"
                  class="w-full border border-gray-300 rounded-lg px-4 py-3">
                  <option value="">Select an occasion</option>
                  <option value="Business Meeting">Business Meeting</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Family Dinner">Family Dinner</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label for="specialRequest" class="block text-sm font-semibold mb-2">
                Special Requests
              </label>
              <textarea id="specialRequest" name="special_request" rows="4"
                placeholder="Any seating preferences or special requirements?"
                class="w-full border border-gray-300 rounded-lg px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-slovenia-green"></textarea>
            </div>

            <p class="text-xs text-gray-500">
              Submitting a request does not guarantee table availability.
              The restaurant will review and confirm your reservation.
            </p>

            <button type="submit" id="bookingSubmit"
              class="bg-slovenia-green hover:bg-slovenia-lightgreen text-white
                     px-7 py-3 rounded-lg font-semibold transition">
              <i class="fa-solid fa-paper-plane mr-2"></i>
              Submit Reservation
            </button>
          </form>
        </div>
      </section>

      <!-- All Reservations -->
      <section id="reservationsPage" class="page-section hidden">
        <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div class="p-5 md:p-7 border-b">
            <h2 class="text-2xl font-bold">My Reservations</h2>
            <p class="text-sm text-gray-500 mt-2">
              Track your booking IDs and approval status.
            </p>
          </div>

          <div id="allBookings" class="p-5 md:p-7">
            <p class="text-sm text-gray-500">Loading reservations...</p>
          </div>
        </div>
      </section>

      <!-- Profile -->
      <section id="profilePage" class="page-section hidden">
        <div class="bg-white rounded-2xl border border-gray-200 p-5 md:p-8">
          <h2 class="text-2xl font-bold">My Profile</h2>
          <p class="text-sm text-gray-500 mt-2">Your registered account details.</p>

          <div class="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p class="text-sm text-gray-500">Full Name</p>
              <p id="profileName" class="font-semibold mt-2">—</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Email Address</p>
              <p id="profileEmail" class="font-semibold mt-2 break-all">—</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Mobile Number</p>
              <p id="profileMobile" class="font-semibold mt-2">—</p>
            </div>
          </div>

          <p class="text-xs text-gray-500 mt-7">
            Profile details are loaded from your account API.
          </p>
        </div>
      </section>

      <footer class="text-center text-xs text-gray-500 py-8">
        © 2026 Restavracija Wilma Ljubljana. All rights reserved.
      </footer>

    </div>
  </main>
</div>

<script>
  /*
   * API CONTRACT
   * Adjust these URLs to match your actual PHP API.
   * This dashboard expects JSON responses and a secure same-origin session.
   */
  const API = {
    me: '/api/me.php',
    bookings: '/api/my-bookings.php',
    createBooking: '/api/bookings.php',
    logout: '/api/logout.php'
  };

  let customer = null;
  let bookings = [];

  const $ = id => document.getElementById(id);

  function showNotice(message, type = 'success') {
    const box = $('notice');
    box.textContent = message;
    box.className = 'mb-5 p-4 rounded-xl text-sm ' +
      (type === 'error'
        ? 'bg-red-50 text-red-700 border border-red-200'
        : 'bg-green-50 text-green-800 border border-green-200');
    box.classList.remove('hidden');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
      credentials: 'same-origin',
      ...options,
      headers: {
        'Accept': 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {})
      }
    });

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('The server returned an invalid response.');
    }

    if (response.status === 401) {
      window.location.href = 'login.php';
      throw new Error('Please log in again.');
    }

    if (!response.ok || data.success === false) {
      throw new Error(data.message || 'Something went wrong.');
    }

    return data;
  }

  function statusBadge(status) {
    const value = String(status || 'pending').toLowerCase();

    const styles = {
      approved: 'bg-green-100 text-green-800',
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-amber-100 text-amber-800',
      rejected: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-700'
    };

    const label = value.charAt(0).toUpperCase() + value.slice(1);

    return `<span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
      styles[value] || styles.pending
    }">${label}</span>`;
  }

  function safe(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function bookingCard(booking) {
    const id = booking.booking_id || booking.id || '—';
    const date = booking.date || booking.booking_date || '—';
    const time = booking.time || booking.booking_time || '—';
    const guests = booking.guests ?? booking.guest_count ?? '—';
    const status = booking.status || 'pending';

    return `
      <div class="border border-gray-200 rounded-xl p-4 md:p-5">
        <div class="flex flex-wrap justify-between items-start gap-3">
          <div>
            <p class="text-xs text-gray-500">BOOKING ID</p>
            <p class="font-bold text-slovenia-green mt-1">${safe(id)}</p>
          </div>
          ${statusBadge(status)}
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 text-sm">
          <div>
            <p class="text-gray-500 text-xs">Date</p>
            <p class="font-semibold mt-1">${safe(date)}</p>
          </div>
          <div>
            <p class="text-gray-500 text-xs">Time</p>
            <p class="font-semibold mt-1">${safe(time)}</p>
          </div>
          <div>
            <p class="text-gray-500 text-xs">Guests</p>
            <p class="font-semibold mt-1">${safe(guests)}</p>
          </div>
        </div>

        ${booking.admin_message ? `
          <div class="bg-gray-50 rounded-lg p-3 mt-4 text-sm">
            <p class="text-gray-500 text-xs mb-1">Restaurant Message</p>
            <p>${safe(booking.admin_message)}</p>
          </div>` : ''}
      </div>
    `;
  }

  function renderBookings() {
    $('totalCount').textContent = bookings.length;

    $('pendingCount').textContent = bookings.filter(b =>
      String(b.status).toLowerCase() === 'pending'
    ).length;

    $('approvedCount').textContent = bookings.filter(b =>
      ['approved', 'confirmed'].includes(String(b.status).toLowerCase())
    ).length;

    const recent = bookings.slice(0, 3);
    $('recentBookings').innerHTML = recent.length
      ? `<div class="space-y-4">${recent.map(bookingCard).join('')}</div>`
      : `<div class="text-center py-8">
           <i class="fa-regular fa-calendar text-3xl text-gray-300"></i>
           <p class="font-semibold mt-3">No reservations yet</p>
           <p class="text-sm text-gray-500 mt-1">Your bookings will appear here.</p>
         </div>`;

    $('allBookings').innerHTML = bookings.length
      ? `<div class="space-y-4">${bookings.map(bookingCard).join('')}</div>`
      : `<p class="text-sm text-gray-500">You have not submitted any reservations yet.</p>`;
  }

  function showPage(page) {
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.add('hidden');
    });

    const section = $(page + 'Page');
    if (section) section.classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === page);
    });

    const titles = {
      overview: 'Customer Dashboard',
      book: 'Reserve a Table',
      reservations: 'My Reservations',
      profile: 'My Profile'
    };

    $('pageTitle').textContent = titles[page] || 'Customer Dashboard';
  }

  async function loadDashboard() {
    try {
      const [meData, bookingData] = await Promise.all([
        apiRequest(API.me),
        apiRequest(API.bookings)
      ]);

      customer = meData.customer || meData.user || meData;
      bookings = Array.isArray(bookingData.bookings)
        ? bookingData.bookings
        : Array.isArray(bookingData)
          ? bookingData
          : [];

      const name = customer.name || customer.full_name || 'Guest';

      $('topName').textContent = name;
      $('welcomeName').textContent = name;
      $('profileName').textContent = name;
      $('profileEmail').textContent = customer.email || '—';
      $('profileMobile').textContent = customer.mobile || customer.phone || '—';

      renderBookings();
    } catch (error) {
      showNotice(
        error.message + ' Check that your API endpoints are configured.',
        'error'
      );

      $('recentBookings').innerHTML =
        '<p class="text-sm text-gray-500">Could not load reservations.</p>';
      $('allBookings').innerHTML =
        '<p class="text-sm text-gray-500">Could not load reservations.</p>';
    }
  }

  document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => showPage(button.dataset.page));
  });

  document.querySelectorAll('[data-go]').forEach(button => {
    button.addEventListener('click', () => showPage(button.dataset.go));
  });

  // Use local date as the earliest selectable date.
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');
  $('bookingDate').min = localToday;

  $('bookingForm').addEventListener('submit', async event => {
    event.preventDefault();

    const button = $('bookingSubmit');
    button.disabled = true;
    button.textContent = 'Submitting...';

    const payload = {
      date: $('bookingDate').value,
      time: $('bookingTime').value,
      guests: Number($('guestCount').value),
      occasion: $('occasion').value,
      special_request: $('specialRequest').value.trim()
    };

    try {
      const result = await apiRequest(API.createBooking, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      $('bookingForm').reset();
      $('bookingDate').min = localToday;

      showNotice(
        'Your request has been submitted. Booking ID: ' +
        (result.booking_id || result.booking?.booking_id || 'See My Reservations') +
        '. It is pending until the restaurant approves it.'
      );

      await loadDashboard();
      showPage('reservations');
    } catch (error) {
      showNotice(error.message, 'error');
    } finally {
      button.disabled = false;
      button.innerHTML =
        '<i class="fa-solid fa-paper-plane mr-2"></i> Submit Reservation';
    }
  });

  $('logoutBtn').addEventListener('click', async () => {
    if (!confirm('Are you sure you want to log out?')) return;

    try {
      await apiRequest(API.logout, { method: 'POST' });
    } catch (error) {
      // Do not treat an API error as a confirmed logout.
      showNotice('Logout failed. Please try again.', 'error');
      return;
    }

    window.location.href = 'login.php';
  });

  loadDashboard();
</script>

</body>
</html>
