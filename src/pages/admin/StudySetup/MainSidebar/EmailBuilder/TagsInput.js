import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import Downshift from "downshift";

const useStyles = makeStyles({
    chip: {
        margin: "5px !important",
    },
});

export default function TagsInput({ ...props }) {
    const classes = useStyles();
    const { selectedTags, placeholder, tags, value, ...other } = props;
    const [inputValue, setInputValue] = React.useState("");
    const [selectedItem, setSelectedItem] = React.useState([]);
    useEffect(() => {
        setSelectedItem(tags);
    }, [tags]);
    useEffect(() => {
        selectedTags(selectedItem);
    }, [selectedItem, selectedTags]);

    function handleKeyDown(event) {
        // event.preventDefault();
        // console.log("KEY ... ", event.key);
        if (event.key === " ") {
            const newSelectedItem = [...selectedItem];
            const duplicatedValues = newSelectedItem.indexOf(
                event.target.value.trim()
            );

            if (duplicatedValues !== -1) {
                setInputValue("");
                return;
            }
            if (!event.target.value.replace(/\s/g, "").length) return;

            newSelectedItem.push(event.target.value.trim());
            setSelectedItem(newSelectedItem);
            setInputValue("");
        }
        if (
            selectedItem.length &&
            !inputValue.length &&
            event.key === "Backspace"
        ) {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    }
    function handleChange(event, item) {
        event.preventDefault();
        let newSelectedItem = [...selectedItem];
        if (newSelectedItem.indexOf(item) === -1) {
            newSelectedItem = [...newSelectedItem, item];
        }
        setInputValue("");
        setSelectedItem(newSelectedItem);
    }

    const handleDelete = (item) => () => {
        // event.preventDefault();
        const newSelectedItem = [...selectedItem];
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
        setSelectedItem(newSelectedItem);
    };

    function handleInputChange(event) {
        event.preventDefault();
        setInputValue(event.target.value);
    }

    const textBoxStyles = {
        fontSize: 15,
        width: "320px",
        height: "6px",
    };

    return (
        <React.Fragment>
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={(event) => handleChange(event)}
                selectedItem={selectedItem}
            >
                {({ getInputProps }) => {
                    const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                        onKeyDown: handleKeyDown,
                        placeholder,
                    });
                    return (
                        <div className="tagsInput">
                            <TextField
                                sx={{
                                    "& legend": { display: "none" },
                                    "& fieldset": { top: 0 },
                                }}
                                inputProps={{ style: textBoxStyles }}
                                InputProps={{
                                    startAdornment: selectedItem.map((item) => (
                                        <Chip
                                            key={item}
                                            tabIndex={-1}
                                            label={item}
                                            className={classes.chip}
                                            onDelete={handleDelete(item)}
                                        />
                                    )),
                                    onBlur,
                                    onChange: (event) => {
                                        handleInputChange(event);
                                        onChange(event);
                                    },
                                    onFocus,
                                }}
                                variant="outlined"
                                label={""}
                                {...other}
                                {...inputProps}
                            />
                        </div>
                    );
                }}
            </Downshift>
        </React.Fragment>
    );
}
TagsInput.defaultProps = {
    tags: [],
};
TagsInput.propTypes = {
    selectedTags: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
};
