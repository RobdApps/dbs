module.exports = mongoose => {
    const Banner = mongoose.model(
        "Banner",
        mongoose.Schema(
            {
                url: String,
                name: String,
            },
            { timestamps: true }
        )
    );
    return Banner;
};
