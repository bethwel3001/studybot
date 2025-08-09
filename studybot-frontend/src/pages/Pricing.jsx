import { motion } from 'framer-motion';
import Button from '../components/common/Button';

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out StudyBot",
    features: [
      "5 homework questions per month",
      "Basic progress tracking",
      "Limited subject access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Student",
    price: "$9.99",
    description: "Ideal for individual learners",
    features: [
      "Unlimited homework questions",
      "Advanced progress tracking",
      "All subjects included",
      "Priority support",
    ],
    cta: "Start Learning",
    popular: true,
  },
  {
    name: "Family",
    price: "$19.99",
    description: "Best for households with multiple students",
    features: [
      "Everything in Student plan",
      "Up to 4 student profiles",
      "Family progress dashboard",
      "24/7 premium support",
    ],
    cta: "Get Family Plan",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Choose the plan that fits your needs. Start for free, upgrade anytime.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl shadow-md overflow-hidden ${
                plan.popular ? "ring-2 ring-primary-500 dark:ring-primary-400" : "border border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 dark:bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-8 bg-white dark:bg-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need a custom plan?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            We offer discounts for schools and educational institutions. Contact us to learn more about our group plans.
          </p>
          <Button variant="secondary">Contact Sales</Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;