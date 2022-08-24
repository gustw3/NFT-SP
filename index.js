const { Network, Alchemy } = require("alchemy-sdk");
const ethers = require("ethers");
const boredABI = require("./abi/bored.json");
require("dotenv").config()

async function main() {
	const boredAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
	const provider = new ethers.providers.WebSocketProvider(
		`wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_WEBSOCKET}`
	);


	const contract = new ethers.Contract(boredAddress, boredABI, provider);

	const result = await contract.tokenURI(1020);
	console.log(result)

	contract.on("Transfer", (from, to, value, event) => {
		let info = {
			from: from,
			to: to,
			value: ethers.utils.formatUnits(value, 6),
			data: event,
		};
		console.log(JSON.stringify(info, null, 4));
	})
}

main()





// contract: 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D
// websocket: wss://eth-mainnet.g.alchemy.com/v2/
