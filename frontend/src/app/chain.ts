import { defineChain, sepolia } from "thirdweb/chains";

const sepoliatestnet = defineChain( sepolia );
const scrolltestnet = defineChain(534351);

const chains = [sepoliatestnet, scrolltestnet];


export default chains