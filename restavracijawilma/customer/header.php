
<header class="topbar">
    <a href="/customer/" class="brand">
        <img src="/images/footer-logo.jpeg"
             alt="Restavracija Wilma"
             onerror="this.style.display='none'">
        <span>Customer Portal</span>
    </a>

    <div class="topbar-user">
        <div class="avatar">
            <i class="fa-solid fa-user"></i>
        </div>

        <span><?= htmlspecialchars($customerName) ?></span>

        <form action="/api/logout.php" method="POST">
            <button type="submit" class="logout-btn" title="Logout">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
            </button>
        </form>
    </div>
</header>
<div class="dashboard-layout">
