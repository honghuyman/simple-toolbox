import Stack from "@mui/material/Stack";
import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from "@mui/material/Chip";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Typography from "@mui/material/Typography";
import HowTo from "../components/how-to/HowTo";


function List({list, onClick}) {
    return (
        <Grid container spacing={1}>
            {list.map((item, index) => (
                <Grid item>
                    <Chip
                        key={index}
                        label={item}
                        onClick={() => onClick(index)}
                    />

                </Grid>
            ))}
        </Grid>
    );
}

function ItemInput({onEnter}) {
    const [value, setValue] = React.useState('');
    const handleChange = (e) => setValue(e.target.value);
    const handleKeyDown = (e) => {
        if (value === '') return;

        if (e.key === 'Enter') {
            onEnter(value);
            setValue('');
        }
    };
    return (
        <TextField
            label="New item"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
}

function ClearButton({onClick}) {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            color="warning"
        >
            <DeleteIcon/>
            CLEAR
        </Button>
    );
}

function ShuffleButton({onClick}) {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            color="secondary"
        >
            <ShuffleIcon/>
            SHUFFLE
        </Button>
    );
}

function PickedItem({item, onClick}) {
    return (
        <Button
            variant="contained"
            fullWidth
            onClick={onClick}
            size="large"
            style={{textTransform: "none"}}
        >
            {item}
        </Button>
    );
}

function RandomPicker() {
    function pickRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    const [list, setList] = React.useState([]);
    const [picked, setPicked] = React.useState(null);

    function handleAdd(item) {
        setList(list.concat(item));
    }

    function handleRemove(index) {
        setList(list.filter((_, i) => i !== index));
    }

    function handleClear() {
        setList([]);
        setPicked(null);
    }

    function handlePick() {
        setPicked(pickRandom(list));
    }

    function handleShuffle() {
        setList(list.sort(() => Math.random() - 0.5).slice());
    }

    return (
        <Stack spacing={2}>
            <Stack spacing={2} direction="row">
                <ClearButton onClick={handleClear}/>
                <ShuffleButton onClick={handleShuffle}/>
            </Stack>
            <ItemInput onEnter={handleAdd}/>
            <List list={list} onClick={handleRemove}/>
            <PickedItem item={picked ? picked : "PICK"} onClick={handlePick}/>
            <HowTo content={(
                <div>
                    <Typography>
                        Enter an item in the <b>New item</b> field and press <b>Enter</b> to add it to the list.
                    </Typography>
                    <Typography>
                        Click on the <b>PICK</b> button to pick a random item from the list.
                    </Typography>
                    <Typography>
                        Click on the <b>SHUFFLE</b> button to shuffle the list.
                    </Typography>
                    <Typography>
                        Click on the <b>CLEAR</b> button to clear the list.
                    </Typography>
                </div>
            )}/>
        </Stack>
    );
}

export default RandomPicker;