import json
import os

SHALOM_DESCRIPTION = """Imagine Salaam/Shalom ("Peace" in Arabic/Hebrew a 'la Yoko Ono's "Imagine Peace") is a Charity NFT Collection that draws on the unique perspective of the Live Encyclopedia: Large Nature Model. In 500 unique digital pieces, the project hallucinates imagined possibilities when two male soldiers, one Israeli and one Palestinian, are disarmed, stripped of their uniforms, and subsequently transported to a utopian shared space. Removed from their locals of Gaza, Tel Aviv, or Jerusalem, the men become reacquainted in an underwater biblical Garden of Eden falling into the depth of the Mediterranean Sea. Their human, sensual, and intimate lives are revealed and showcased with a generative AI model dedicated to the natural world. As witnesses, we are invited to Imagine Peace and Wage Hope.

Benefits two non-profit organizations: Parents Circle Families Forum (PCFF) and Doctors Without Borders/Médecins Sans Frontières (MSF)."""

PHOENIX_DESCRIPTION = """LA Phoenix is a Charity NFT Collection comprised of 800 unique digital artworks. Utilizing the Live Encyclopedia: Large Nature Model, the project imagines via the generative AI Large Nature Model a futuristic bio-sustainable Los Angeles. Voyaging from the Hollywood Sign to Griffith Observatory, from Santa Monica Pier to DTLA, we witness the harmony and love of the diverse Angelino community, who create their own unique utopia in a climate-safe environment.

Benefits the LA Arts Community Fire Relief Fund and the Refik Anadol Studios Web3 Fund."""

def create_metadata_files(collection_name, total_supply, image_base_url, output_dir, description, external_url):
    # Create output directory if it doesn't exist
    collection_dir = os.path.join(output_dir, collection_name)
    os.makedirs(collection_dir, exist_ok=True)

    # Generate metadata for each token (starting from 1)
    for token_id in range(1, total_supply + 1):
        metadata = {
            "name": f"{collection_name} #{token_id}",
            "description": description,
            "image": image_base_url.replace("X", str(token_id)),
            "external_url": external_url,
            "attributes": [
                {
                    "trait_type": "Collection",
                    "value": collection_name
                },
                {
                    "trait_type": "Edition",
                    "value": token_id,
                    "max_value": total_supply
                }
            ],
            "background_color": "000000"
        }

        # Write metadata to file
        with open(os.path.join(collection_dir, f"{token_id}.json"), 'w') as f:
            json.dump(metadata, f, indent=2)

def main():
    # Create base metadata directory
    base_dir = "metadata"
    os.makedirs(base_dir, exist_ok=True)

    # Generate Imagine Shalom metadata
    create_metadata_files(
        "ImagineShalomNFT",
        500,
        "https://gateway.lighthouse.storage/ipfs/bafybeiga72cxu2rjbdxfscpg5dwehvri3udr2c5viucecfuaj36nlydkae/X.jpg",
        base_dir,
        SHALOM_DESCRIPTION,
        "https://waginghope.com/imagine"
    )

    # Generate LA Phoenix metadata
    create_metadata_files(
        "LAPhoenixNFT",
        800,
        "https://gateway.lighthouse.storage/ipfs/bafybeiem5ayp2inpytrydjnzfbq6eg2bmq324p3tjs2iktflgjjasn5z5u/X.jpg",
        base_dir,
        PHOENIX_DESCRIPTION,
        "https://waginghope.com/la"
    )

    # Generate collection-level metadata
    collections = {
        "ImagineShalomNFT": {
            "name": "Imagine Salaam/Shalom",
            "description": SHALOM_DESCRIPTION,
            "image": "https://gateway.lighthouse.storage/ipfs/bafybeiga72cxu2rjbdxfscpg5dwehvri3udr2c5viucecfuaj36nlydkae/1.jpg",
            "external_link": "https://peace-harmony-nft-galleria.vercel.app/shalom",
            "seller_fee_basis_points": 250,  # 2.5% royalty
            "fee_recipient": "0x5f3cbAbdBf80b00c564C20298A190fA6868B374a"  # Address that will receive royalties
        },
        "LAPhoenixNFT": {
            "name": "LA Phoenix",
            "description": PHOENIX_DESCRIPTION,
            "image": "https://gateway.lighthouse.storage/ipfs/bafybeiem5ayp2inpytrydjnzfbq6eg2bmq324p3tjs2iktflgjjasn5z5u/1.jpg",
            "external_link": "https://peace-harmony-nft-galleria.vercel.app/phoenix",
            "seller_fee_basis_points": 250,  # 2.5% royalty
            "fee_recipient": "0x5f3cbAbdBf80b00c564C20298A190fA6868B374a"  # Address that will receive royalties
        }
    }

    # Write collection metadata files
    for collection_name, collection_metadata in collections.items():
        with open(os.path.join(base_dir, collection_name, "collection.json"), 'w') as f:
            json.dump(collection_metadata, f, indent=2)

if __name__ == "__main__":
    main()
    print("Metadata generation completed successfully!") 