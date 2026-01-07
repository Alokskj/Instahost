
import { toast } from "sonner";

const Footer = () => {
    const handleTermsClick = () => {
        toast("📜 Terms of Service", {
            description: "Don't do anything illegal, and we're cool! That's basically it. 🤝",
        });
    };

    const handlePrivacyClick = () => {
        toast("🔒 Privacy Policy", {
            description: "We won't sell your data... we're too broke for that kind of business anyway! Your secrets are safe with us 🤫",
        });
    };

    const handleContactClick = () => {
        toast("✉️ Contact Us", {
            description: "Have questions or need help? Reach out to us at alokskj14@gmail.com. We're here to assist you! 📬",
        });
    };

    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
            <p className="text-xs text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Instahost. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <div 
                    className="text-xs hover:underline underline-offset-4 cursor-pointer"
                    onClick={handleTermsClick}
                >
                    Terms of Service
                </div>
                <div 
                    className="text-xs hover:underline underline-offset-4 cursor-pointer"
                    onClick={handlePrivacyClick}
                >
                    Privacy
                </div>
                <div 
                    className="text-xs hover:underline underline-offset-4 cursor-pointer"
                    onClick={handleContactClick}
                >
                    Contact
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
