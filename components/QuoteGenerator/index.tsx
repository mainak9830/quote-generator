import { Backdrop, Fade, Modal } from "@mui/material";
import { ModalCircularProgress, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorModalInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle } from "./QuoteGeneratorElements";
import { useEffect, useState } from "react";
import AnimatedDownloadButton from "../animations/AnimatedDownloadButton";
import { ImageBlobCon } from "../animations/AnimationElements";
import ImageBlob from "../animations/ImageBlob";

interface QuoteGeneratorModalProps {
    open: boolean,
    close: () => void;
    processingQuote: boolean;
    setProcessingQuote: React.Dispatch<React.SetStateAction<boolean>>;
    quoteReceived: String | null;
    setQuoteReceived: React.Dispatch<React.SetStateAction<String | null>>;
}

const style = {

};

const QuoteGeneratorModal = ({
    open, 
    close,
    processingQuote,
    setProcessingQuote,
    quoteReceived,
    setQuoteReceived,
}: QuoteGeneratorModalProps) => {
    const wiseDevQuote = '"If you can center a div, anything is possible."';
    const wiseDevQuoteAuthor = "- a wise senior software engineer";
    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    
    //handling the download
    const handleDownload = () => {
        const link = document.createElement('a');
        if (typeof blobUrl === 'string') {
            link.href = blobUrl;
            link.download = 'quote.png';
            link.click();
        }
    }

    useEffect(() => {
        if(quoteReceived){
            const binaryData = Buffer.from(quoteReceived, 'base64');
            const blob = new Blob([binaryData], { type: 'image/png' });
            const blobUrlGenerated = URL.createObjectURL(blob);
            console.log(blobUrlGenerated);
            setBlobUrl(blobUrlGenerated);

            return () => {
                URL.revokeObjectURL(blobUrlGenerated);
            }
        }
    }, [quoteReceived]);

    return (
        <Modal
            id="QuoteGeneratorModal"
            aria-labelledby="spring-modal-quotegeneratormodal"
            aria-describedby="spring-modal-opens-and-closes-quote-generator"
            open={open}
            onClose={close}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <QuoteGeneratorCon>
                    <QuoteGeneratorInnerCon>
                        <QuoteGeneratorModalInnerCon>
                            {/* State #1: Processing request of quote + quote states empty */}
                            {
                               ( processingQuote === true && quoteReceived === null) && 
                                <>
                                    <ModalCircularProgress 
                                        size={"8rem"}
                                        thickness={2.5}
                                    />
                                    <QuoteGeneratorTitle>
                                        Generating your quote
                                    </QuoteGeneratorTitle>
                                    <QuoteGeneratorSubTitle style={{marginTop: "20px"}}>
                                        {wiseDevQuote}
                                        <br></br>
                                        <span style={{fontSize: 26}}>{wiseDevQuoteAuthor}</span>
                                    </QuoteGeneratorSubTitle>
                                </>
                            }
                            {/* state #2 quote state fulfilled*/}
                            {
                                quoteReceived !== null && 
                                <>
                                    <QuoteGeneratorTitle>
                                        Download your quote!
                                    </QuoteGeneratorTitle>
                                    <QuoteGeneratorSubTitle style={{marginTop: "20px"}}>
                                        See your preview:
                                    </QuoteGeneratorSubTitle>
                                    <ImageBlobCon>
                                    <ImageBlob
                                        quoteReceived={quoteReceived}
                                        blobUrl={blobUrl}
                                    />
                                    </ImageBlobCon>
                                    <AnimatedDownloadButton
                                        handleDownload={handleDownload}
                                    />
                                </>
                            }
                        </QuoteGeneratorModalInnerCon>
                    </QuoteGeneratorInnerCon>
                </QuoteGeneratorCon>
            </Fade>
        </Modal>
    )
}

export default QuoteGeneratorModal;