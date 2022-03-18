import React from 'react'

export default function Footer() {
    return (
        <footer className='p-4 text-gray-300 bg-gray-700'>
            <p className='m-8 text-sm'>
                Portions of MTG-Library are unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy. The literal and graphical information presented on this site about Magic: The Gathering, including card images, the mana symbols, and Oracle text, is copyright Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc. MTG-Library is not produced by, endorsed by, supported by, or affiliated with Wizards of the Coast.
                <br />
                <br />
                Card images and card data by Scryfall
                <br />
                Icons by Heroicons
                <br />
                <br />
                All other content © {new Date().getFullYear()} MTG-Library.
            </p>
        </footer>
    )
}
