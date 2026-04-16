// Validation rules and error messages
export const VALIDATION_RULES = {
  productName: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  price: {
    required: true,
    min: 0,
    max: 1000000,
  },
  quantity: {
    required: true,
    min: 0,
    max: 100000,
  },
  category: {
    required: true,
  },
  status: {
    required: true,
  },
};

export const CATEGORIES = [
  'Food',
  'Drink',
  'Daily Product',
  'Electronics',
  'Clothing',
  'Others',
];

export const STATUS_OPTIONS = ['Pending', 'Bought'];

export const STATUS_COLORS = {
  Pending: 'warning',
  Bought: 'success',
};

// Validation function
export const validateProduct = (formValues, existingProducts = [], excludeId = null) => {
  const errors = {};

  // Validate Product Name
  if (!formValues.productName?.trim()) {
    errors.productName = 'Product name is required';
  } else if (formValues.productName.length < VALIDATION_RULES.productName.minLength) {
    errors.productName = `Minimum ${VALIDATION_RULES.productName.minLength} characters required`;
  } else if (formValues.productName.length > VALIDATION_RULES.productName.maxLength) {
    errors.productName = `Maximum ${VALIDATION_RULES.productName.maxLength} characters allowed`;
  } else {
    // Deduplication rule: Block only if a product with same name exists AND has "Pending" status
    // Allow if the existing product has "Bought" status
    const pendingDuplicate = existingProducts.find(
      (p) =>
        p.productName.toLowerCase() === formValues.productName.toLowerCase() &&
        p.id !== excludeId &&
        p.status === 'Pending'
    );
    if (pendingDuplicate) {
      errors.productName = `"${formValues.productName}" already exists with Pending status. Complete or delete it first.`;
    }
  }

  // Validate Price
  if (!formValues.price && formValues.price !== 0) {
    errors.price = 'Price is required';
  } else if (Number(formValues.price) < VALIDATION_RULES.price.min) {
    errors.price = 'Price cannot be negative';
  } else if (Number(formValues.price) > VALIDATION_RULES.price.max) {
    errors.price = `Price cannot exceed ${VALIDATION_RULES.price.max}`;
  }

  // Validate Quantity
  if (!formValues.quantity && formValues.quantity !== 0) {
    errors.quantity = 'Quantity is required';
  } else if (Number(formValues.quantity) < VALIDATION_RULES.quantity.min) {
    errors.quantity = 'Quantity cannot be negative';
  } else if (Number(formValues.quantity) > VALIDATION_RULES.quantity.max) {
    errors.quantity = `Quantity cannot exceed ${VALIDATION_RULES.quantity.max}`;
  }

  // Validate Category
  if (!formValues.category?.trim()) {
    errors.category = 'Category is required';
  }

  // Validate Status
  if (!formValues.status?.trim()) {
    errors.status = 'Status is required';
  }

  return errors;
};

// Format currency
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value || 0);
};

// Format date to YYYY/MM/DD
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// Calculate total value for a product
export const calculateProductValue = (price, quantity) => {
  return (Number(price) || 0) * (Number(quantity) || 0);
};
