cargo build --release --target wasm32-unknown-unknown --package indexer
candid-extractor target/wasm32-unknown-unknown/release/indexer.wasm > src/indexer/indexer.did