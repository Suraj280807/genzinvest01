"use client";

import { motion } from "framer-motion";
import NewsCard from "./NewsCard";

interface NewsFeedProps {
    newsItems: any[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function NewsFeed({ newsItems }: NewsFeedProps) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"
        >
            {newsItems.map((news) => (
                <motion.div key={news.id} variants={item}>
                    <NewsCard news={news} />
                </motion.div>
            ))}
        </motion.div>
    );
}
