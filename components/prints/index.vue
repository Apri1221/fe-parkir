<template>
    <div class="w-full" id="print-me">
        <div class="grid grid-cols-4 gap-4 place-items-center">
            <img width="128" height="128"
                    src="/kab-bogor.png"
                    alt="">
            <div class="col-span-2 text-center">
                <p class="font-bold text-xs h-3">Parking Ticket</p>
                <p class="text-xs">BJY Parking</p>
            </div>
            <img width="256" height="256"
                    src="/bjs-logo.png"
                    alt="">
        </div>

        <div>
            <p class="font-bold text-xs h-3">{{ loggedInUser.institutions.name }}</p>
            <p class="text-xs">{{ loggedInUser.institutions.address }}</p>
        </div>

        <div class="grid grid-cols-9 gap-2 content-start h-3">
            <p class="col-span-3 text-xs">No. Tiket</p>
            <span class="text-xs">:</span>
            <p class="col-span-5 text-xs">{{ transactions.no_ticket }}</p>
        </div>
        <div class="grid grid-cols-9 gap-2 content-start h-3">
            <p class="col-span-3 text-xs">Tanggal</p>
            <span class="text-xs">:</span>
            <p class="col-span-5 text-xs">{{ `${$moment(transactions.created_at).format("DD MMM YYYY")} ${transactions.time}` }}</p>
        </div>
        <div class="grid grid-cols-9 gap-2 content-start h-3">
            <p class="col-span-3 text-xs">No. Polisi</p>
            <span class="text-xs">:</span>
            <p class="col-span-5 text-xs">{{ transactions.no_vehicle }}</p>
        </div>

        <div class="grid grid-cols-9 gap-2 content-start h-3">
            <p class="col-span-3 text-xs">Kendaraan</p>
            <span class="text-xs">:</span>
            <p class="col-span-5 text-xs">{{ transactions.type_vehicle }}</p>
        </div>

        <div class="grid grid-cols-9 gap-2 content-start h-3">
            <p class="col-span-3 text-xs">Harga Parkir</p>
            <span class="text-xs">:</span>
            <p class="col-span-5 text-xs">{{ convertRupiah(transactions.price_vehicle) }}</p>
        </div>

        <div class="grid grid-cols-9 gap-2 content-start h-3">
            <p class="col-span-3 text-xs">Harga Tiket</p>
            <span class="text-xs">:</span>
            <p class="col-span-5 text-xs">{{ convertRupiah(transactions.price_people) }} / orang</p>
        </div>

        <div class="grid grid-cols-9 gap-2 content-start h-3">
            <p class="col-span-3 text-xs">Jml. Orang</p>
            <span class="text-xs">:</span>
            <p class="col-span-5 text-xs">{{ transactions.quantity }}</p>
        </div>

        <div class="grid grid-cols-9 gap-2 content-start">
            <p class="font-bold col-span-3 text-xs">Total</p>
            <span class="text-xs">:</span>
            <p class="font-bold col-span-5 text-xs">{{ convertRupiah(transactions.total) }}</p>
        </div>

        <p class="text-center px-2 text-xs h-3">{{ loggedInUser.institutions.notes }}</p>
    </div>
</template>
<script>
import printJS from "print-js";
import { mapActions, mapGetters } from "vuex";
import toRupiah from '@develoka/angka-rupiah-js';

export default {
    name: "Invoice",
    props: ['title', 'title', 'asset_logo', 'transactions', 'onFinish'],
    methods: {
        isDate(col) {
            return col === 'created_at' || col === 'updated_at'
        },
        convertRupiah(val) {
            return toRupiah(val, {formal: false})
        } 
    },
    mounted() {
        printJS({ 
            printable: 'print-me', 
            type: 'html', 
            onPrintDialogClose: () => {this.onFinish()},
            css: '/custom-print.css',
            scanStyles: false,
            style: [
                '@page { size: 40mm 80mm; margin: 0; font-size: 4pt; } * { padding: 0.5mm !important; margin: 0 !important; }'
            ],
            targetStyles: ['*'],
        })
    },
    computed: {
        ...mapGetters({
            loggedInUser: "loggedInUser",
        }),
    }
};
</script>