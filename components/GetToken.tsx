'use client'

import React, {useContext, useState, useEffect} from 'react'
import {Input, Text, Grid, Space} from '@mantine/core'
import { authenticator } from 'otplib'
import { SecretContext } from './SecretStore'
export const GetToken = () => {
    const [final, setFinal] = useState<string>('')
    const [timeLeft, setTimeLeft] = useState<number>(authenticator.timeRemaining())
    const {token }= useContext(SecretContext)
    
    useEffect(() => {
        
        if (token){
            setFinal(authenticator.generate(token))
            
        }
    }, [token])

    useEffect(() => {
        if (timeLeft === 30){
            setFinal(authenticator.generate(token))
        }
    }, [timeLeft])

    useEffect(() => {
        const timing = setInterval(() => {
          setTimeLeft(authenticator.timeRemaining());
        }, 1000);
    
        return () => {
          clearInterval(timing);
        };
      }, []);
    

      return (
        <>
        
            
                <Grid>
                    <Grid.Col>
                        <Text> Next in: {timeLeft} s</Text>
                    </Grid.Col>
                </Grid>
                <Space h="xl" />
                
                    <Input value={final || 'Loading ... '}  />
                
            
        </>
      )
}