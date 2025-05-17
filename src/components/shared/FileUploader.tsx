'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
// Removed FileWithPath as it is not exported from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type FileUploaderProps = {
    onFieldChange: (url: string) => void
    imageUrl: string
    setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles)
        onFieldChange(convertFileToUrl(acceptedFiles[0]))
    }, [onFieldChange, setFiles])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(['image/*']),
    })

    return (
        <div
            {...getRootProps()}
            className="flex-center bg-dark-3 flex  cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
            <input {...getInputProps()} className="cursor-pointer" />

            {imageUrl ? (
                <div className="flex h-full w-full flex-1 justify-center">
                    <img
                        src={imageUrl}
                        alt="image"
                        width={250}
                        height={250}
                        className="w-full object-cover object-center"
                    />
                </div>
            ) : (
                <div className="flex h-72 justify-center items-center flex-col bg-secondary py-5 text-grey-500">
                    <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
                    <h3 className="mt-2">Drag photo here</h3>
                    <p className="my-2 text-[12px]">SVG, PNG, JPG</p>
                    <Button
                        type="button"
                        className="rounded-full mt-2 bg-primary"
                        onClick={(e) => {
                            e.stopPropagation()
                            // Programmatically trigger file input click
                            const input = document.querySelector('input[type="file"]') as HTMLInputElement
                            input?.click()
                        }}
                    >
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    )
}