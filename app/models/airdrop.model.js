module.exports = mongoose => {
    const Airdrop = mongoose.model(
        "airdrop",
        mongoose.Schema(
            {
                airdrop: Object,
                visible: Boolean,
                isFinished: Boolean,
                removed: Boolean,
                isCancelled:Boolean,
                chainId: Number,
            },
            { timestamps: true }
        )
    );
    return Airdrop;
};