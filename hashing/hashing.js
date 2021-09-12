'use strict';

const crypto = require('crypto');

// The Power of a Smile by Tupac Shakur
const poem = [
	'The power of a gun can kill',
	'and the power of fire can burn',
	'the power of wind can chill',
	'and the power of a mind can learn',
	'the power of anger can rage',
	'inside until it tears u apart',
	'but the power of a smile',
	'especially yours can heal a frozen heart',
];

const Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: '000000',
	data: '',
	timestamp: Date.now(),
});

function blockHash(block) {
	return crypto
		.createHash('sha256')
		.update(`${block.index};${block.prevHash};${block.data};${block.timestamp};`)
		.digest('hex');
}

function createBlock(data) {
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data,
		timestamp: Date.now(),
	};

	block.hash = blockHash(block);

	Blockchain.blocks.push(block);

	return block;
}

// Insert each line of poem into blockchain as a separate block
for (let line of poem) {
	createBlock(line);
}

function verifyBlock(block) {
	const { index, hash, data, prevHash, timestamp } = block;
	if (Number.isInteger(index) && index === 0 && hash === '000000') { return true; }

	const blockHashData = { index, prevHash, data, timestamp };
	if (
		data && data !== ''
		&& prevHash && prevHash !== ''
		&& Number.isInteger(index) && index >= 0
		&& blockHash(blockHashData) === hash) {
		return true;
	}

	return false;
}

function verifyChain(blockchain) {
	console.log(blockchain.blocks);

	let isValid = true;
	blockchain.blocks.forEach((block) => {
		if (!verifyBlock(block)) { isValid = false; }
	})

	return isValid;
}

console.log(`\n\nBlockchain is valid: ${verifyChain(Blockchain)}`);

