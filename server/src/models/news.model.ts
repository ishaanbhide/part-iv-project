import mongoose, { Schema, Document } from "mongoose";

interface INews extends Document {
    title: string;
    body: string;
    source: string;
    image: string;
    location: {
        type: string;
        coordinates: number[];
    };
}

const PointSchema: Schema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const NewsSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        source: { type: String, required: true },
        image: { type: String, required: false },
        location: {
            type: PointSchema,
            index: "2dsphere",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<INews>("News", NewsSchema);
