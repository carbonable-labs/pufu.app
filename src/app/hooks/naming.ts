import BN from "bn.js";
import { useContractRead } from "@starknet-react/core";
import { useNamingContract } from "./contracts";
import { useContext, useEffect, useState } from "react";
import { utils } from "starknetid.js";
import { StarknetIdJsContext } from "../context/StarknetIdJsProvider";
import { basicAlphabet } from "../utils/constants";
import { Abi } from "starknet";

// TODO: remove and use utils.decodeDomain when dapp uses starknet.js v5
export function useDecoded(encoded: BN[]): string {
  const convertEncoded = encoded.map((element) => BigInt(element.toString()));
  return utils.decodeDomain(convertEncoded);
}

type DomainData = {
  domain: string;
  error?: string;
  hasDomain: boolean;
};

export function useDomainFromAddress(
  address: string | BN | undefined
): DomainData {
  const { starknetIdNavigator } = useContext(StarknetIdJsContext);
  const [domain, setDomain] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [hasDomain, setHasDomain] = useState<boolean>(false);

  useEffect(() => {
    if (!address) {
      setHasDomain(false);
      return
    };
    const fetchStarkName = async () => {
      const domain = await starknetIdNavigator
        ?.getStarkName(address.toString())
        .catch((err) => {
          setError(err);
        });
      setDomain(domain as string);
      setHasDomain(true);
    };
    fetchStarkName();
  }, [starknetIdNavigator, address]);

  return { domain, error, hasDomain };
}

type AddressData = {
  address?: string;
  error?: string;
};

export function useAddressFromDomain(domain: string | undefined): AddressData {
  const { starknetIdNavigator } = useContext(StarknetIdJsContext);
  const [address, setAddress] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!domain) return;
    const fetchAddress = async () => {
      const addr = await starknetIdNavigator
        ?.getAddressFromStarkName(domain)
        .catch((err) => {
          setError(err);
        });
      setAddress(addr as string);
    };
    fetchAddress();
  }, [starknetIdNavigator, domain]);

  return { address, error };
}

export function useIsValid(domain: string | undefined): boolean | string {
  if (!domain) domain = "";

  for (const char of domain) if (!basicAlphabet.includes(char)) return char;
  return true;
}

type TokenIdData = {
  tokenId?: number;
  error?: string;
};

export function useTokenIdFromDomain(domain: string): TokenIdData {
  const { starknetIdNavigator } = useContext(StarknetIdJsContext);
  const [tokenId, setTokenId] = useState<number | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!domain) return;
    const fetchAddress = async () => {
      const token = await starknetIdNavigator
        ?.getStarknetId(domain)
        .catch((err) => {
          setError(err);
        });
      setTokenId(token as number);
    };
    fetchAddress();
  }, [starknetIdNavigator, domain]);

  return { tokenId, error };
}

type ExpiryData = {
  expiry?: BN[][];
  error?: string;
};

export function useExpiryFromDomain(domain: string): ExpiryData {
  const { contract } = useNamingContract();
  const encoded = domain
    ? utils.encodeDomain(domain).map((elem) => new BN(elem.toString())) // remove when dapp uses starknet.js v5
    : [];

  const { data, error } = useContractRead({
    address: contract?.address as string,
    abi: contract?.abi as Abi,
    functionName: "domain_to_expiry",
    args: [encoded],
  });

  return { expiry: data as any, error: error as string };
}
