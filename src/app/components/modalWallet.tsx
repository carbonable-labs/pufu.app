"use client";
import React, { useState } from "react";
import { FunctionComponent } from "react";
import { Modal } from "@mui/material";
import { UseTransactionResult, useAccount } from "@starknet-react/core";
import { ContentCopy } from "@mui/icons-material";
import CopiedIcon from "./iconsComponents/icons/copiedIcon";
import ClickableAction from "./iconsComponents/clickableAction";
import { CommonTransactionReceiptResponse } from "starknet";
import CloseIcon from "./iconsComponents/icons/closeIcon";
import ArgentIcon from "./iconsComponents/icons/argentIcon";
import LogoutIcon from "@mui/icons-material/Logout";

type ModalWalletProps = {
  closeModal: () => void;
  open: boolean;
  domain: string;
  disconnectByClick: () => void;
  transactions: UseTransactionResult[];
};

const ModalWallet: FunctionComponent<ModalWalletProps> = ({
  closeModal,
  open,
  domain,
  disconnectByClick,
  transactions,
}) => {
  const { address, connector } = useAccount();
  const [copied, setCopied] = useState(false);
  const network =
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "testnet" : "mainnet";
  const copyToClipboard = () => {
    if (!address) return;
    setCopied(true);
    navigator.clipboard.writeText(address);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <Modal
      disableAutoFocus
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div >
        <button  onClick={closeModal}>
          <CloseIcon />
        </button>
        <div >
          <div>
            {connector && connector.id() === "braavos" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                width={"25px"}
                src="/visuals/braavosLogo.svg"
                alt="braavos logo"
              />
            ) : (
              <ArgentIcon color={"#f36a3d"} width={"25px"} />
            )}

            <p className="ml-2">Connected with &nbsp;{domain}&nbsp;</p>
          </div>
        </div>
        <div className="flex flex-row justify-around flex-wrap mb-3">
          <ClickableAction
            onClick={disconnectByClick}
            icon={<LogoutIcon width="25" />}
            title="Disconnect"
            width="auto"
          />
          <ClickableAction
            onClick={copyToClipboard}
            icon={
              copied ? (
                <CopiedIcon width="25" />
              ) : (
                <ContentCopy width="25" />
              )
            }
            title="Copy Address"
            width="auto"
          />
        </div>
        <div >
          <div >My transactions</div>
          <div>
            {transactions && transactions.length > 0 ? (
              transactions.map((tx) => {
                return (
                  <div
                    
                    key={tx.data?.transaction_hash}
                  >
                    <a
                      href={`https://${
                        network === "testnet" ? "testnet." : ""
                      }starkscan.co/tx/${tx.data?.transaction_hash}`}
                      
                      target="_blank"
                      rel="noreferrer"
                    >
                      {tx.data?.transaction_hash?.slice(0, 6) +
                        "..." +
                        tx.data?.transaction_hash?.slice(
                          tx.data?.transaction_hash.length - 6,
                          tx.data?.transaction_hash.length
                        )}
                    </a>
                    <div>
                      {tx.status === "success" &&
                        tx.data &&
                        (tx.data as CommonTransactionReceiptResponse).status}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No ongoing transactions</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalWallet;
