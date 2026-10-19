

<aside class="sidebar">
    <p class="sidebar-heading">MY ACCOUNT</p>

    <nav class="sidebar-nav">
        <?php foreach ($menuItems as $key => $item): ?>
            <a
                href="<?= htmlspecialchars($item['url']) ?>"
                class="nav-link <?= $currentPage === $key ? 'active' : '' ?>"
                <?= $currentPage === $key ? 'aria-current="page"' : '' ?>
            >
                <i class="fa-solid <?= htmlspecialchars($item['icon']) ?>"></i>
                <span><?= htmlspecialchars($item['label']) ?></span>
            </a>
        <?php endforeach; ?>
    </nav>

    <div class="sidebar-bottom">
        <i class="fa-solid fa-utensils"></i>
        <h4>A memorable dining experience</h4>
        <p>Reserve your table at Restavracija Wilma.</p>

        <a href="/" class="website-link">
            <i class="fa-solid fa-arrow-left"></i>
            Back to Website
        </a>
    </div>
</aside>
