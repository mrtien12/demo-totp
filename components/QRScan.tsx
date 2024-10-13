'use client'
import React, {Fragment, useContext, useState, useEffect} from  'react'
import { SecretContext } from './SecretStore'
import QRCode from 'qrcode'
import { authenticator } from 'otplib'
import { Image } from '@mantine/core'

export const QRScan = () => {
    const {token} = useContext(SecretContext)
    const [link, setLink] = useState<string>('')
    const [image, setImage]   = useState<string>('')
    
    useEffect(() => {

        if (!token){
            setImage('')
            return
        }

        const otpauth = authenticator.keyuri(
            'tienta',
            'totp-demo',
            token


            )
        setLink(otpauth)

        QRCode.toDataURL(otpauth, (err, data) => {
            if (err){
                setImage('')
                return
            }
            setImage(data)
        })
    }, [token])



    return (
    
        <>
            {image && link && (
                <Image 
                    radius = 'md'
                    h = {200}
                    w="auto"
                    fit ="contain"
                    src = {image}
                    onClick={() => window.open(link)}
                    alt='QR Code'
                />
            )}
        
        </>
    
    )



}