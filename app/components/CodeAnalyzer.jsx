"use client";

import { useState } from "react";

import { 
    Card,
    CardContent, 
    CardHeader, 
    CardTitle 
  } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"


import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserTypescript from "prettier/parser-typescript";
import SyntaxHighlighter from "react-syntax-highlighter";

const languages = ["Python", "C++", "Java", "JavaScript", "Ruby", "Go", "Rust", "TypeScript"];

export default function CodeAnalyzer() {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("");
    const [timeComplexity, setTimeComplexity] = useState("N/A");
    const [spaceComplexity, setSpaceComplexity] = useState("N/A");
    const [loading, setLoading] = useState(false);

    const handleCodeChange = async (e) => {
        const rawCode = e.target.value;
        try {
            const formattedCode = await prettier.format(rawCode, {
                parser: "babel",
                plugins: [parserBabel, parserTypescript],
            });
        } catch(e) {
            console.error(e);
            setCode(rawCode);
        }
    }
    return (
        <>
            <div className="max-w-3xl mx-auto py-10 px-4">                
                <h1 className="text-4xl font-bold text-center text-black mb-6">
                    Code Analyzer
                </h1>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Time Complexity</CardTitle>
                        </CardHeader>
                        <CardContent>{loading ? "Analyzing..." : timeComplexity}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Space Complexity</CardTitle>
                        </CardHeader>
                        <CardContent>{loading ? "Analyzing..." : timeComplexity}</CardContent>
                    </Card>
                </div>
                <Select onValueChange={setLanguage} value={language} className="mb-6">
                    <SelectTrigger>
                        <SelectValue placeholder="Select Language"/>
                    </SelectTrigger>
                    <SelectContent>
                        {languages.map((lang) => (
                            <SelectItem key={lang} value={lang.toLowerCase()}>
                                {lang}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="">
                    <SyntaxHighlighter>
                        {code}
                    </SyntaxHighlighter>
                </div>
                <textarea 
                    value={code}
                    onChange={handleCodeChange}
                    className="w-full h-64 p-4 mt-4 bg-gray-100 rounded-lg"
                    placeholder="Enter your code here..."
                />
                <Button className="mt-4">Analyze it!</Button>
            </div>
        </>
    );
}