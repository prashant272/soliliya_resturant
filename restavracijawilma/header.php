<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>header</title>

</head>
<body>
<header class="sticky top-0 z-40  backdrop-blur-md text-white border-b border-slovenia-gold/20 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">

                <!-- Logo -->
                <!-- <a href="#home" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 rounded-full bg-slovenia-gold flex items-center justify-center text-slovenia-dark font-heading font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                        <img src="/images/logo-2-removebg-preview.png" alt="logo">
                    </div>
                    <div>
                        <span class="font-heading text-2xl font-bold text-center tracking-widest text-white block leading-none">WILMA</span>
                        <span class="text-white block font-size ">malice in kosila</span>
                        <span class="text-[10px] tracking-widest text-slovenia-gold uppercase font-medium">Ljubljana • Slovenia</span>
                    </div>
                </a> -->


                <!-- Logo --> 
                <a href="#home" class="flex items-center gap-1 group">
                    <div class="">
                        <img src="images/WILMA HORIZONTAL WEBSITE LOGO .png" alt="logo" class="w-full h-full object-contain padding-3" style="height: 200px; width: 200px;">
                    </div>
                    <!-- <div> <span class="font-heading text-2xl font-bold tracking-widest text-white block leading-none text-center"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">WILMA</font></font></span>
                        <span class="text-white block font-size"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">snacks and lunches</font></font></span> <span class="tracking-widest text-slovenia-gold uppercase font-medium block slovenia-font"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Ljubljana • Slovenia</font></font></span> </div> -->
                </a>

                <!-- Desktop Menu -->
           
<nav class="hidden md:flex items-center space-x-6 text-sm font-bold tracking-wide">
    <a href="#home" class="text-gray-900 hover:text-[#D4AF37] transition-colors">Home</a>
    <a href="#about" class="text-gray-900 hover:text-[#D4AF37] transition-colors">About Us</a>
    <a href="#menu" class="text-gray-900 hover:text-[#D4AF37] transition-colors">Menu</a>
    <a href="#booking" class="text-gray-900 hover:text-[#D4AF37] transition-colors">Reservation</a>
    <a href="#contact" class="text-gray-900 hover:text-[#D4AF37] transition-colors">Contact &amp; Support</a>
</nav>


                <!-- Header Actions -->
                <div class="hidden lg:flex items-center gap-4">
                    <a href="tel:040791618" class="flex items-center gap-2 text-xs text-slovenia-gold bg-slovenia-charcoal px-3 py-2 rounded-lg border border-slovenia-gold/30 hover:border-slovenia-gold transition-all">
                        <i class="fa-solid fa-phone"></i>
                        <span><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">040 791 618</font></font></span>
                    </a>
                    
                    <!-- Login / Signup Button (Combined) -->
                    <button onclick="openAuthModal()" class="flex items-center gap-2 text-xs text-gray-900 bg-white px-4 py-2 rounded-lg border border-gray-300 hover:border-slovenia-gold hover:bg-gray-50 transition-all shadow-sm">
                        <i class="fa-solid fa-user"></i>
                        <span><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Login / Sign Up</font></font></span>
                    </button>
                    
                    <a href="#booking" class="bg-slovenia-gold hover:bg-yellow-500 text-slovenia-dark font-semibold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md hover:shadow-slovenia-gold/20">
                        <i class="fa-solid fa-utensils mr-2"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Book a Table
                    </font></font></a>
                </div>

                <!-- Mobile Menu Button -->
                <button id="mobileMenuBtn" class="md:hidden text-gray-300 hover:text-white focus:outline-none p-2">
                    <i class="fa-solid fa-bars text-2xl"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div id="mobileMenu" class="hidden md:hidden bg-slovenia-charcoal border-b border-slovenia-gold/20 px-4 pt-2 pb-6 space-y-3 text-sm">
            <a href="#home" class="mobile-link block py-2 text-gray-200 hover:text-slovenia-gold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Home</font></font></a>
            <a href="#about" class="mobile-link block py-2 text-gray-200 hover:text-slovenia-gold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">About Us</font></font></a>
            <a href="#menu" class="mobile-link block py-2 text-gray-200 hover:text-slovenia-gold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Menu</font></font></a>
            <a href="#booking" class="mobile-link block py-2 text-gray-200 hover:text-slovenia-gold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Table Reservation</font></font></a>
            <a href="#contact" class="mobile-link block py-2 text-gray-200 hover:text-slovenia-gold"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Contact</font></font></a>
            
            <!-- Mobile Auth Button (Combined) -->
            <div class="pt-2 flex flex-col gap-2">
                <button onclick="openAuthModal()" class="w-full text-center py-2.5 bg-white text-gray-900 rounded-lg border border-gray-300 font-medium flex items-center justify-center gap-2">
                    <i class="fa-solid fa-user"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Login / Sign Up</font></font>
                </button>
                <a href="tel:040791618" class="text-center py-2 bg-slovenia-dark text-slovenia-gold rounded-lg border border-slovenia-gold/30">
                    <i class="fa-solid fa-phone mr-2"></i><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">Call 040 791 618
                </font></font></a>
                <a href="#booking" class="mobile-link text-center py-2.5 bg-slovenia-gold text-slovenia-dark font-semibold rounded-lg"><font dir="auto" style="vertical-align: inherit;"><font dir="auto" style="vertical-align: inherit;">
                    Book a Table
                </font></font></a>
            </div>
        </div>
    </header>

</body>
</html>