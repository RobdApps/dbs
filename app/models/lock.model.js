module.exports = mongoose => {
    const Lock = mongoose.model(
        "lock",
        mongoose.Schema(
            {
                lock: Object,
                visible: Boolean,
                isFinished: Boolean,
                liquidity: Boolean,
                removed: Boolean,
                isCancelled:Boolean,
                chainId: Number,
            },
            { timestamps: true }
        )
    );
    return Lock;
};