// =======================================
// MENGAMBIL ELEMEN HTML
// =======================================

const formReservasi = document.getElementById("formReservasi");
const nama = document.getElementById("nama");
const identitas = document.getElementById("identitas");
const asal = document.getElementById("asal");
const tujuan = document.getElementById("tujuan");
const tanggal = document.getElementById("tanggal");
const maskapai = document.getElementById("maskapai");
const penumpang = document.getElementById("penumpang");
const kelas = document.getElementById("kelas");
const detailAsal = document.getElementById("detailAsal");
const detailTujuan = document.getElementById("detailTujuan");
const detailMaskapai = document.getElementById("detailMaskapai");
const detailKelas = document.getElementById("detailKelas");
const detailHarga = document.getElementById("detailHarga");
const hargaTiket = document.getElementById("hargaTiket");
const catatan = document.getElementById("catatan");
const jumlahData = document.getElementById("jumlahData");
const emptyState = document.getElementById("emptyState");
const hapusSemua = document.getElementById("hapusSemua");
const tableBody = document.getElementById("tableBody");
const btnPesan = document.getElementById("btnPesan");

// =======================================
// EVENT SUBMIT FORM
// =======================================

if (formReservasi) {

    formReservasi.addEventListener("submit", function (event) {

        event.preventDefault();

        if (nama.value == "") {
            alert("Nama pemesan harus diisi.");
            nama.focus();
            return;
        }

        let namaBenar = true;

        for (let i = 0; i < nama.value.length; i++) {

            let huruf = nama.value[i];

            if (!(
                (huruf >= "A" && huruf <= "Z") ||
                (huruf >= "a" && huruf <= "z") ||
                huruf == " "
            )) {

                namaBenar = false;

            }

        }

        if (namaBenar == false) {
            alert("Nama pemesan hanya boleh berisi huruf.");
            nama.focus();
            return;
        }

        if (identitas.value == "") {
            alert("Nomor identitas harus diisi.");
            identitas.focus();
            return;
        }

        let identitasBenar = true;

        for (let i = 0; i < identitas.value.length; i++) {

            let angka = identitas.value[i];

            if (!(angka >= "0" && angka <= "9")) {

                identitasBenar = false;

            }

        }

        if (identitasBenar == false) {
            alert("Nomor identitas hanya boleh berisi angka.");
            identitas.focus();
            return;
        }

        if (identitas.value.length != 16) {
            alert("Nomor identitas harus terdiri dari 16 digit.");
            identitas.focus();
            return;
        }

        if (identitasBenar == false) {
            alert("Nomor identitas hanya boleh berisi angka.");
            identitas.focus();
            return;
        }

        if (identitas.value.length != 16) {
            alert("Nomor identitas harus terdiri dari 16 digit.");
            identitas.focus();
            return;
        }

        if (asal.value == "") {
            alert("Silakan pilih kota asal.");
            asal.focus();
            return;
        }

        if (tujuan.value == "") {
            alert("Silakan pilih kota tujuan.");
            tujuan.focus();
            return;
        }

        if (asal.value == tujuan.value) {
            alert("Kota asal dan kota tujuan tidak boleh sama.");
            tujuan.focus();
            return;
        }

        if (tanggal.value == "") {
            alert("Silakan pilih tanggal keberangkatan.");
            tanggal.focus();
            return;
        }

        if (maskapai.value == "") {
            alert("Silakan pilih maskapai.");
            maskapai.focus();
            return;
        }

        if (penumpang.value == "") {
            alert("Silakan masukkan jumlah penumpang.");
            penumpang.focus();
            return;
        }

        if (penumpang.value < 1 || penumpang.value > 50) {
            alert("Jumlah penumpang harus antara 1 sampai 50 orang.");
            penumpang.focus();
            return;
        }

        if (kelas.value == "") {
            alert("Silakan pilih kelas penerbangan.");
            kelas.focus();
            return;
        }

        let dataReservasi = {
            nama: nama.value,
            identitas: identitas.value,
            asal: asal.value,
            tujuan: tujuan.value,
            tanggal: tanggal.value,
            maskapai: maskapai.value,
            penumpang: penumpang.value,
            kelas: kelas.value,
            catatan: catatan.value,
            totalHarga: detailHarga.innerHTML,
            status: "Berhasil"
        };

        let daftarReservasi = localStorage.getItem("reservasi");

        if (daftarReservasi == null) {
            daftarReservasi = [];
        } else {
            daftarReservasi = JSON.parse(daftarReservasi);
        }

        daftarReservasi.push(dataReservasi);

        localStorage.setItem("reservasi", JSON.stringify(daftarReservasi));

        alert("Reservasi berhasil dibuat.");
        window.location.href = "Riwayat.html";
        formReservasi.reset();

    });

}

if (tableBody) {

    let daftarReservasi = localStorage.getItem("reservasi");

    if (daftarReservasi == null) {
        daftarReservasi = [];
    }
    else {
        daftarReservasi = JSON.parse(daftarReservasi);
    }

    jumlahData.innerHTML = daftarReservasi.length + " Reservasi";

    if (daftarReservasi.length == 0) {
        emptyState.style.display = "block";
    }
    else {
        emptyState.style.display = "none";
    }

    for (let i = 0; i < daftarReservasi.length; i++) {

        tableBody.innerHTML +=
            "<tr>" +
            "<td>" + (i + 1) + "</td>" +
            "<td>" + daftarReservasi[i].nama + "</td>" +
            "<td>" + daftarReservasi[i].asal + " - " + daftarReservasi[i].tujuan + "</td>" +
            "<td>" + daftarReservasi[i].maskapai + "</td>" +
            "<td>" + daftarReservasi[i].tanggal + "</td>" +
            "<td>" + daftarReservasi[i].totalHarga + "</td>" +
            "<td><span class='status proses'>" + daftarReservasi[i].status + "</span></td>" +
            "<td>" +
            "<button onclick='lihatDetail(" + i + ")' class='btn-detail'>Detail</button> " +
            "<button onclick='hapusReservasi(" + i + ")' class='btn btn-outline'>Hapus</button>" +
            "</td>" +
            "</tr>";

    }

}

if (hapusSemua) {

    hapusSemua.addEventListener("click", function () {

        let konfirmasi = confirm("Apakah Anda yakin ingin menghapus semua riwayat reservasi?");

        if (konfirmasi == true) {

            localStorage.removeItem("reservasi");

            location.reload();

        }

    });

}

function lihatDetail(index) {

    let daftarReservasi = localStorage.getItem("reservasi");

    daftarReservasi = JSON.parse(daftarReservasi);

    let data = daftarReservasi[index];

    alert(
        "===== DETAIL RESERVASI =====\n\n" +
        "Nama : " + data.nama +
        "\nNomor Identitas : " + data.identitas +
        "\nRute : " + data.asal + " - " + data.tujuan +
        "\nTanggal : " + data.tanggal +
        "\nMaskapai : " + data.maskapai +
        "\nJumlah Penumpang : " + data.penumpang +
        "\nKelas : " + data.kelas +
        "\nCatatan : " + data.catatan +
        "\nStatus : " + data.status
    );

}

function hapusReservasi(index) {

    let konfirmasi = confirm("Apakah Anda yakin ingin menghapus reservasi ini?");

    if (konfirmasi == true) {

        let daftarReservasi = localStorage.getItem("reservasi");

        daftarReservasi = JSON.parse(daftarReservasi);

        daftarReservasi.splice(index, 1);

        localStorage.setItem("reservasi", JSON.stringify(daftarReservasi));

        location.reload();

    }

}

function tampilDetailPenerbangan() {

    detailAsal.innerHTML = asal.value;
    detailTujuan.innerHTML = tujuan.value;
    detailMaskapai.innerHTML = maskapai.value;
    detailKelas.innerHTML = kelas.value;

    // Tampilkan harga tiket berdasarkan maskapai dan kelas
    if (maskapai.value == "Garuda Indonesia") {

        let harga = 0;

        if (kelas.value == "Economy") {
            harga = 1250000;
        }
        else if (kelas.value == "Premium Economy") {
            harga = 1700000;
        }
        else if (kelas.value == "Business") {
            harga = 2600000;
        }
        else if (kelas.value == "First Class") {
            harga = 4000000;
        }

        hargaTiket.innerHTML = "Rp" + harga.toLocaleString("id-ID");
        detailHarga.innerHTML = "Rp" + (harga * penumpang.value).toLocaleString("id-ID");

        btnPesan.disabled = false;
    }

    else if (maskapai.value == "Citilink") {

        let harga = 0;

        if (kelas.value == "Economy") {
            harga = 950000;
        }
        else if (kelas.value == "Premium Economy") {
            harga = 1350000;
        }
        else {

            hargaTiket.innerHTML = "Tidak tersedia";
            detailHarga.innerHTML = "Tidak tersedia";
            btnPesan.disabled = true;
            return;

        }

        hargaTiket.innerHTML = "Rp" + harga.toLocaleString("id-ID");
        detailHarga.innerHTML = "Rp" + (harga * penumpang.value).toLocaleString("id-ID");

        btnPesan.disabled = false;
    }

    else if (maskapai.value == "Batik Air") {

        let harga = 0;

        if (kelas.value == "Economy") {
            harga = 1100000;
        }
        else if (kelas.value == "Premium Economy") {
            harga = 1550000;
        }
        else if (kelas.value == "Business") {
            harga = 2400000;
        }
        else {

            hargaTiket.innerHTML = "Tidak tersedia";
            detailHarga.innerHTML = "Tidak tersedia";
            btnPesan.disabled = true;

            return;

        }

        hargaTiket.innerHTML = "Rp" + harga.toLocaleString("id-ID");
        detailHarga.innerHTML = "Rp" + (harga * penumpang.value).toLocaleString("id-ID");

        btnPesan.disabled = false;

    }

    else if (maskapai.value == "Lion Air") {

        let harga = 0;

        if (kelas.value == "Economy") {
            harga = 850000;
        }
        else {

            hargaTiket.innerHTML = "Tidak tersedia";
            detailHarga.innerHTML = "Tidak tersedia";
            btnPesan.disabled = true;

            return;

        }

        hargaTiket.innerHTML = "Rp" + harga.toLocaleString("id-ID");
        detailHarga.innerHTML = "Rp" + (harga * penumpang.value).toLocaleString("id-ID");

        btnPesan.disabled = false;

    }

    else if (maskapai.value == "AirAsia") {

        let harga = 0;

        if (kelas.value == "Economy") {
            harga = 900000;
        }
        else if (kelas.value == "Premium Economy") {
            harga = 1300000;
        }
        else {

            hargaTiket.innerHTML = "Tidak tersedia";
            detailHarga.innerHTML = "Tidak tersedia";
            btnPesan.disabled = true;

            return;

        }

        hargaTiket.innerHTML = "Rp" + harga.toLocaleString("id-ID");
        detailHarga.innerHTML = "Rp" + (harga * penumpang.value).toLocaleString("id-ID");

        btnPesan.disabled = false;

    }
}

if (asal) {
    asal.addEventListener("change", tampilDetailPenerbangan);
}

if (tujuan) {
    tujuan.addEventListener("change", tampilDetailPenerbangan);
}

if (maskapai) {
    maskapai.addEventListener("change", tampilDetailPenerbangan);
}

if (kelas) {
    kelas.addEventListener("change", tampilDetailPenerbangan);

    if (penumpang) {
        penumpang.addEventListener("input", tampilDetailPenerbangan);
    }
}
