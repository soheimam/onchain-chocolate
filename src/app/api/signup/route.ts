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
    const body = await request.json() as ClerkPayload;

    console.log(JSON.stringify(body, null, 2));

    // Validate request came from Clerk
    const wallet = body.data.web3_wallets[0].web3_wallet;
    if (!wallet) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Load private key and create signer
    const privateKey = process.env.MASTER_KEY;
    if (!privateKey) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    const signer = new ethers.Wallet(privateKey);



    try {
        // Transfer 1 USDC
        const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, signer);
        const tx = await usdcContract.transfer(wallet, ethers.parseUnits("1", 6));
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

interface ClerkPayload {
    data: Data;
    event_attributes: Eventattributes;
    object: string;
    timestamp: number;
    type: string;
}

interface Eventattributes {
    http_request: Httprequest;
}

interface Httprequest {
    client_ip: string;
    user_agent: string;
}

interface Data {
    backup_code_enabled: boolean;
    banned: boolean;
    create_organization_enabled: boolean;
    created_at: number;
    delete_self_enabled: boolean;
    external_id: null;
    first_name: null;
    has_image: boolean;
    id: string;
    image_url: string;
    last_active_at: number;
    last_name: null;
    last_sign_in_at: null;
    legal_accepted_at: null;
    locked: boolean;
    lockout_expires_in_seconds: null;
    mfa_disabled_at: null;
    mfa_enabled_at: null;
    object: string;
    password_enabled: boolean;
    primary_email_address_id: null;
    primary_phone_number_id: null;
    primary_web3_wallet_id: string;
    profile_image_url: string;

    totp_enabled: boolean;
    two_factor_enabled: boolean;
    updated_at: number;
    username: null;
    verification_attempts_remaining: number;
    web3_wallets: Web3wallet[];
}

interface Web3wallet {
    created_at: number;
    id: string;
    object: string;
    updated_at: number;
    verification: Verification;
    web3_wallet: string;
}

interface Verification {
    attempts: number;
    expire_at: number;
    status: string;
    strategy: string;
}



