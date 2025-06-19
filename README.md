# Table Rotation Engine

A TypeScript-based CLI tool that performs one-step counter-clockwise rotation on square tables represented as flat arrays.

## Overview

This engine processes CSV files containing table data and rotates square tables by moving elements one position counter-clockwise around concentric rings. Only perfect square tables (1×1, 2×2, 3×3, 4×4, etc.) can be rotated.

## Features

- ✅ **Streaming Processing**: Memory-efficient processing of large CSV files
- ✅ **Ring-based Rotation**: Rotates concentric rings independently
- ✅ **Input Validation**: Handles invalid JSON, non-arrays, and non-perfect squares
- ✅ **Multiple Table Sizes**: Supports any perfect square from 1×1 to large grids
- ✅ **Error Handling**: Graceful handling of malformed data
- ✅ **TypeScript**: Fully typed with comprehensive test coverage

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd table-rotation-engine

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Command Line

```bash
# Process a CSV file and output to stdout
node cli.js input.csv

# Save output to a file
node cli.js input.csv > output.csv
```

### Input Format

CSV file with `id` and `json` columns:

```csv
id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
4,"[1, 2, 3, 4, 5]"
```

### Output Format

CSV file with `id`, `json`, and `is_valid` columns:

```csv
id,json,is_valid
1,"[4,1,2,7,5,3,8,9,6]",true
2,"[90,40,10,20]",true
3,"[-5]",true
4,"[]",false
```

## Development

### Scripts

```bash
# Build TypeScript to JavaScript
npm run build

# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Format code with Prettier
npm run prettier
```

### Project Structure

```
src/
├── cli.ts              # Main CLI entry point (streaming)
├── rotateTable.ts      # Single table rotation logic
├── types.ts           # TypeScript interfaces
└── tests/             # Unit tests
    ├── rotateTable.test.ts
```
