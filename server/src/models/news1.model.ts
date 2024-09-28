import mongoose, { Schema, Document } from "mongoose";

export interface ILocationCoord {
    type: string;
    coordinates: number[][];
}

export interface INews1 extends Document {
    summary: {
        start_date: string;
        end_date: string;
        last_updated: string;
        locations: string[];
        severity: string;
        categories_topics: string[];
        summary_of_event: string;
        summary_of_event_paragraphs: string[];
        recommended_actions: string[];
    };
    headline: string;
    articles: string[];
    images: string[];
    location_coords: ILocationCoord;   
}

const LocationCoordSchema: Schema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["MultiPoint"],
        required: true,
    },
    coordinates: {
        type: [[Number]], // Array of arrays for MultiPoint
        required: true,
    },
});

const News1Schema: Schema = new Schema(
    {
        summary: {
            start_date: { type: String, required: true },
            end_date: { type: String, required: true },
            last_updated: { type: String, required: true },
            locations: { type: [String], required: true },
            severity: { type: String, required: true },
            categories_topics: { type: [String], required: true },
            summary_of_event: { type: String, required: true },
            summary_of_event_paragraphs: { type: [String], required: true },
            recommended_actions: { type: [String], required: true },
        },
        headline: { type: String, required: true },
        articles: { type: [String], required: true },
        images: { type: [String], required: true },
        // location_coords: { type: [LocationCoordSchema], required: true },
        location_coords: { type: LocationCoordSchema, required: true }, 
    },
    { timestamps: true }
);

News1Schema.index({ location_coords: '2dsphere' });

export default mongoose.model<INews1>("News1", News1Schema);