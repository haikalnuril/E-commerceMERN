export const generateSelectAmount = (amount) => {
    return Array.from({ length: amount }, (_, i) => {
        const amout = i + 1;
    return(
        <option value={amout} key={amout}>
            {amout}
        </option>
    )
    });
}