const menu = [
    {
        nama: "Nasi Goreng",
        harga: 15000,
        gambar: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500"
    },
    {
        nama: "Mie Goreng",
        harga: 13000,
        gambar: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500"
    },
    {
        nama: "Sate Ayam",
        harga: 20000,
        gambar: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=500"
    },
    {
        nama: "Ayam Bakar",
        harga: 25000,
        gambar: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500"
    },
    {
        nama: "Es Teh",
        harga: 5000,
        gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500"
    },
    {
        nama: "Jus Jeruk",
        harga: 8000,
        gambar: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500"
    }
];

let keranjang = [];

function tampilkanMenu() {
    const daftar = document.getElementById("daftar-menu");

    daftar.innerHTML = menu.map((item, index) => `
        <div class="menu-card">
            <img src="${item.gambar}" alt="${item.nama}">
            <h3>${item.nama}</h3>
            <p>Rp${item.harga.toLocaleString("id-ID")}</p>
            <button onclick="tambah(${index})">
                Tambah ke Keranjang
            </button>
        </div>
    `).join("");
}

function tambah(index) {
    const item = menu[index];

    const ditemukan = keranjang.find(
        produk => produk.nama === item.nama
    );

    if (ditemukan) {
        ditemukan.jumlah++;
    } else {
        keranjang.push({
            nama: item.nama,
            harga: item.harga,
            jumlah: 1
        });
    }

    tampilkanKeranjang();
}

function tampilkanKeranjang() {
    const tempat = document.getElementById("keranjang");
    const totalElement = document.getElementById("total");

    tempat.innerHTML = "";

    let total = 0;

    keranjang.forEach((item, index) => {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;

        tempat.innerHTML += `
            <p>
                ${item.nama} -
                ${item.jumlah} x Rp${item.harga.toLocaleString("id-ID")}
                <button onclick="kurangi(${index})">-</button>
                <button onclick="hapus(${index})">Hapus</button>
            </p>
        `;
    });

    totalElement.innerText =
        "Total: Rp" + total.toLocaleString("id-ID");
}

function kurangi(index) {
    keranjang[index].jumlah--;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}

function hapus(index) {
    keranjang.splice(index, 1);
    tampilkanKeranjang();
}

function checkout() {
    const nama = document.getElementById("nama").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const hasil = document.getElementById("hasil");

    if (nama === "" || alamat === "") {
        alert("Silakan isi nama dan alamat!");
        return;
    }

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let total = keranjang.reduce(
        (jumlah, item) =>
        jumlah + item.harga * item.jumlah, 0
    );

    hasil.innerHTML = `
        <h3>Pesanan Berhasil Dibuat!</h3>
        <p>Nama: ${escapeHTML(nama)}</p>
        <p>Alamat: ${escapeHTML(alamat)}</p>
        <p>Total Pembayaran:
        Rp${total.toLocaleString("id-ID")}</p>
        <button onclick="bayar()">Bayar Sekarang</button>
    `;
}

function escapeHTML(teks) {
    return teks.replace(/[&<>"']/g, karakter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[karakter]);
}

function bayar() {
    alert("Pembayaran simulasi berhasil! Terima kasih telah memesan.");

    keranjang = [];
    tampilkanKeranjang();

    document.getElementById("hasil").innerHTML =
        "<h3>Terima kasih telah memesan di Nusantara Food!</h3>";

    document.getElementById("nama").value = "";
    document.getElementById("alamat").value = "";
}

tampilkanMenu();
tampilkanKeranjang();