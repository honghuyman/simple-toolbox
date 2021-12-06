import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React from 'react';
import CryptoJS from 'crypto-js';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Typography from "@mui/material/Typography";
import HowTo from "../components/how-to/HowTo";


export default class Encrypt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            key: '',
            encrypted: '',
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleEncrypt = () => {
        this.setState({
            encrypted: CryptoJS.AES.encrypt(this.state.text, this.state.key).toString()
        });
    }

    handleDecrypt = () => {
        this.setState({
            text: CryptoJS.AES.decrypt(this.state.encrypted, this.state.key).toString(CryptoJS.enc.Utf8)
        });
    }

    render() {
        return (
            <Stack spacing={2}>
                <TextField
                    name="key"
                    label="Key"
                    value={this.state.key}
                    onChange={this.handleChange}
                />
                <TextField
                    name="text"
                    label="Text (Decrypted)"
                    value={this.state.text}
                    onChange={this.handleChange}
                    multiline
                    fullWidth
                    minRows={4}
                    maxRows={10}
                />
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleEncrypt}
                    >
                        <ArrowDownwardIcon/>
                        Encrypt
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleDecrypt}
                    >
                        <ArrowUpwardIcon/>
                        Decrypt
                    </Button>
                </Stack>
                <TextField
                    name="encrypted"
                    label="Encrypted"
                    value={this.state.encrypted}
                    onChange={this.handleChange}
                    multiline
                    fullWidth
                    minRows={4}
                    maxRows={10}
                />
                <HowTo content={(
                    <div>
                        <Typography>
                            This tool is used to encrypt and decrypt text using AES.
                        </Typography>
                        <Typography>
                            The key is used to both encrypt and decrypt the text.
                        </Typography>
                        <Typography>
                            To encrypt, enter the text and the key and click the ENCRYPT button.
                        </Typography>
                        <Typography>
                            To decrypt, enter the encrypted text and the key and click the DECRYPT button.
                        </Typography>
                    </div>
                )}/>
            </Stack>
        );
    }
}



