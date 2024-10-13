'use client'

import React,{ useContext} from "react";
import { SecretContext } from "./SecretStore";
import {Input, Button} from "@mantine/core"

export const Secret = () => {
  const { token, generateSecret } = useContext(SecretContext);

  return (
    <>
        <Input value = {token || 'Loading ...'} />
        <Button onClick={generateSecret}>Generate Secret</Button>
        


    </>
  );
};