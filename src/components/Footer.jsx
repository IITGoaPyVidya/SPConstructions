import { motion } from 'framer-motion';

const footerLinks = {
  Company: ['About Us', 'Our Story', 'Careers', 'Press'],
  Services: ['Residential', 'Commercial', 'Hospitality', 'Industrial', 'Renovation'],
  Projects: ['Completed', 'Ongoing', 'Upcoming', 'Portfolio'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className="bg-steel-900 border-t border-steel-700/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                SP
              </div>
              <div>
                <div className="text-white font-bold text-lg font-heading leading-none">
                  SP <span className="text-orange-500">Construction</span>
                </div>
                <div className="text-concrete/40 text-xs">Building Excellence</div>
              </div>
            </div>
            <p className="text-concrete/50 text-sm leading-relaxed mb-4">
              Goa's premier construction company building extraordinary spaces since 2009.
            </p>
            <div className="flex gap-3">
              {['𝕏', '📘', '📸', '💼'].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-8 h-8 bg-steel-700/50 hover:bg-orange-500 rounded-lg flex items-center justify-center text-sm transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-concrete/50 hover:text-orange-400 text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-steel-700/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-concrete/40 text-sm">
            © 2024 SP Construction Pvt Ltd. All rights reserved. | GSTIN: 30XXXXX0000X1ZX
          </p>
          <div className="flex items-center gap-2 text-concrete/40 text-sm">
            <span>Made with</span>
            <span className="text-red-400">❤️</span>
            <span>in Goa, India</span>
            <span className="text-orange-500">🏗️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
