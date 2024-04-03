import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import companylogo from '../../assets/logo.png';
import Navbar from "./Navbar";
export function FeaturedCompanies() {
    const navigate=useNavigate()
    const [searchTerm, setSearchTerm] = useState("");
    const companies = [
        { name: "Company One", description: "A leading provider of...", logoUrl: "/path-to-logo-1.png" },
        { name: "Company Two", description: "Innovative solutions for...", logoUrl: "/path-to-logo-2.png" },
        { name: "Company One", description: "A leading provider of...", logoUrl: "/path-to-logo-1.png" },
        { name: "Company Two", description: "Innovative solutions for...", logoUrl: "/path-to-logo-2.png" },
        { name: "Company One", description: "A leading provider of...", logoUrl: "/path-to-logo-1.png" },
        { name: "Company Two", description: "Innovative solutions for...", logoUrl: "/path-to-logo-2.png" },
    ];
    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Searching for: ${searchTerm}`);
        // You might want to do something with the searchTerm here, like sending it to an API
    };

    return (
       
        <div>

           <Navbar/>
            <div className="my-8 text-center">
                <Typography variant="h3" color="blue-gray" className="mb-4">
                    Explore Featured Companies
                </Typography>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            {/* SVG and Input elements here */}
                        </div>
                        <input 
                            type="search" 
                            id="default-search" 
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Search companies" 
                            required 
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button 
                            type="submit" 
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company, index) => (
                        <Card key={index} className="cursor-pointer" onClick={() => navigate(`/company/${company.name.replace(/\s+/g, '-').toLowerCase()}`)}>
                            <CardBody className="flex items-center gap-4">
                                <img src={companylogo}  width={200} height={250} alt={company.name} className="" />
                                <div>
                                    <Typography variant="h5" color="blue-gray">{company.name}</Typography>
                                    <Typography>{company.description}</Typography>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <Typography color="gray" className="text-center">
                        No companies found.
                    </Typography>
                )}
            </div>
        </div>
       
    );
}
export default FeaturedCompanies;
