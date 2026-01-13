import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { X, Filter } from "lucide-react";

const CATEGORIES = ["All", "Cybernetics", "Hardware", "Gadgets", "Accessories"];
const COLORS = ["Red", "Blue", "Green", "Black", "White", "Purple"];
const SIZES = ["S", "M", "L", "XL"];
const GENDERS = ["Men", "Women", "Unisex"];
const AGE_GROUPS = ["Kids", "Adults"];

export default function StoreSidebar({
    activeCategory,
    setActiveCategory,
    priceRange,
    setPriceRange,
    activeColor,
    setActiveColor,
    activeSize,
    setActiveSize,
    activeGender,
    setActiveGender,
    activeAgeGroup,
    setActiveAgeGroup,
    inStockOnly,
    setInStockOnly,
    isOpen,
    onClose
}) {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed top-24 left-4 z-40 h-[calc(100vh-7rem)] w-64 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-xl transition-transform duration-300 overflow-y-auto lg:translate-x-0 lg:static lg:h-auto lg:min-h-[calc(100vh-10rem)] ${isOpen ? "translate-x-0" : "-translate-x-[calc(100%+2rem)]"
                    }`}
            >
                <div className="p-6 h-full flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Filter className="w-5 h-5" /> Filters
                        </h2>
                        <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/10 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Categories</h3>
                        <div className="space-y-1">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${activeCategory === cat
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">
                            Max Price: ${priceRange[1]}
                        </h3>
                        <div className="px-2">
                            <Slider
                                max={5000}
                                step={100}
                                value={priceRange}
                                onValueChange={setPriceRange}
                            />
                        </div>
                    </div>

                    {/* Availability */}
                    <div>
                        <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Availability</h3>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${inStockOnly ? "bg-green-500 border-green-500" : "border-white/30 group-hover:border-white/50"}`}>
                                {inStockOnly && <X className="w-3 h-3 text-white rotate-45" strokeWidth={4} />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={inStockOnly}
                                onChange={(e) => setInStockOnly(e.target.checked)}
                            />
                            <span className="text-sm text-white/80 group-hover:text-white">In Stock Only</span>
                        </label>
                    </div>

                    {/* Colors */}
                    <div>
                        <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Color</h3>
                        <div className="flex flex-wrap gap-2">
                            {COLORS.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setActiveColor(activeColor === color ? null : color)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${activeColor === color ? "border-white scale-110 shadow-lg" : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                                        }`}
                                    style={{ backgroundColor: color.toLowerCase() }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Sizes */}
                    <div>
                        <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {SIZES.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setActiveSize(activeSize === size ? null : size)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all border ${activeSize === size
                                        ? "bg-white text-black border-white"
                                        : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Gender</h3>
                        <div className="space-y-1">
                            {GENDERS.map((gender) => (
                                <label key={gender} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${activeGender === gender ? "border-blue-500" : "border-white/30 group-hover:border-white/50"}`}>
                                        {activeGender === gender && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        className="hidden"
                                        checked={activeGender === gender}
                                        onChange={() => setActiveGender(activeGender === gender ? null : gender)}
                                        onClick={() => { if (activeGender === gender) setActiveGender(null); }}
                                    />
                                    <span className={`text-sm transition-colors ${activeGender === gender ? "text-blue-400" : "text-white/60 group-hover:text-white"}`}>{gender}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Age Group */}
                    <div>
                        <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Age Group</h3>
                        <div className="space-y-1">
                            {AGE_GROUPS.map((age) => (
                                <label key={age} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${activeAgeGroup === age ? "bg-purple-500 border-purple-500" : "border-white/30 group-hover:border-white/50"}`}>
                                        {activeAgeGroup === age && <X className="w-3 h-3 text-white rotate-45" strokeWidth={3} />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={activeAgeGroup === age}
                                        onChange={() => setActiveAgeGroup(activeAgeGroup === age ? null : age)}
                                    />
                                    <span className={`text-sm transition-colors ${activeAgeGroup === age ? "text-purple-400" : "text-white/60 group-hover:text-white"}`}>{age}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
