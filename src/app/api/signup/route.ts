import { WebhookEvent } from '@clerk/nextjs/server';
import { ethers } from "ethers";
import { headers } from 'next/headers';
import { NextResponse } from "next/server";
import { Webhook } from 'svix';

const USDC_CONTRACT_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_ABI = [
    "function transfer(address to, uint256 amount) public returns (bool)",
];




export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.CLERK_SIGNING_KEY

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    // Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }

    // Do something with payload
    await handleTransfer(evt as unknown as ClerkPayload);
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', body)

    return new Response('Webhook received', { status: 200 })
}


export async function GET(request: Request) {
    console.log(`${request}`);
    return NextResponse.json({ message: 'Hello from Next.js!' })
}

async function handleTransfer(event: ClerkPayload) {

    // const body = await request.json() as ClerkPayload;


    // Validate request came from Clerk
    const wallet = event.data.web3_wallets[0].web3_wallet;
    console.log(`wallet: ${wallet}`);
    if (!wallet) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Load private key and create signer
    const privateKey = process.env.MASTER_KEY;
    if (!privateKey) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    // Base RPC URL (replace with a reliable RPC provider)
    const baseRpcUrl = process.env.BASE_RPC_URL;

    // Create a provider for the Base network
    const provider = new ethers.JsonRpcProvider(baseRpcUrl);

    // Create a signer using the private key and provider
    const signer = new ethers.Wallet(privateKey, provider);



    try {
        // Transfer 1 USDC
        const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, signer);
        const tx = await usdcContract.transfer(wallet, ethers.parseUnits("1", 6));
        console.log(`tx: ${tx}`);
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



