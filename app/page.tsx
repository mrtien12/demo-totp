import { GetToken } from "@/components/GetToken";
import {Secret} from "../components/Secret";
import {SecretStore} from "../components/SecretStore";
import { QRScan } from "@/components/QRScan";
import {VerifyToken} from '@/components/VerifyToken'
export default function Home() {
  
  return (
    <>
      <SecretStore>
        <Secret />
        <QRScan />
        <GetToken />
        <VerifyToken />

      </SecretStore>
    </>
  );
}