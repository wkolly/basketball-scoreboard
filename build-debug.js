const fs = require('fs');
const { execSync } = require('child_process');

// Run the build command
try {
  console.log('Starting build process...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully');
  
  // Check if build directory exists
  if (fs.existsSync('./build')) {
    console.log('Build directory exists');
    // List contents of build directory
    const files = fs.readdirSync('./build');
    console.log('Build directory contents:', files);
  } else {
    console.error('ERROR: Build directory does not exist!');
  }
} catch (error) {
  console.error('Build failed:', error.message);
} 