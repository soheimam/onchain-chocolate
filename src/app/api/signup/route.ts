import { ethers } from "ethers";
import { NextResponse } from "next/server";

const USDC_CONTRACT_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_ABI = [
    "function transfer(address to, uint256 amount) public returns (bool)",
];

export async function GET(request: Request) {
    console.log(`${request}`);
    return NextResponse.json({ message: 'Hello from Next.js!' })
}

export async function POST(request: Request) {
    const body = await request.json();

    console.log(JSON.stringify(body, null, 2));

    // Validate request came from Clerk
    const { userId } = body;
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Load private key and create signer
    const privateKey = process.env.MASTER_KEY;
    if (!privateKey) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    const signer = new ethers.Wallet(privateKey);

    // Get recipient wallet address from request
    const { walletAddress } = body;
    if (!walletAddress) {
        return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    }

    try {
        // Transfer 1 USDC
        const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, signer);
        const tx = await usdcContract.transfer(walletAddress, ethers.parseUnits("1", 6));
        await tx.wait();

        return NextResponse.json({
            success: true,
            txHash: tx.hash
        });
    } catch (error) {
        console.error('Transfer failed:', error);
        return NextResponse.json({ error: 'Transfer failed' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Hello from Next.js!' })
}