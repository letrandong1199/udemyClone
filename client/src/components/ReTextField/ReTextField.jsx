import { TextField, InputAdornment } from "@material-ui/core"

const ReTextField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    startIcon,
    type = 'text',
    error = null,
    multiple,
    rows,
}) => (
    <TextField
        variant="outlined"
        fullWidth
        name={name}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        InputProps={
            startIcon && {
                startAdornment: (
                    <InputAdornment position="start">
                        {startIcon}
                    </InputAdornment>
                )
            }
        }
        required
        helperText={error}
        error={error ? true : false}
        multiple={multiple}
        rows={rows}
    />
);

export default ReTextField;