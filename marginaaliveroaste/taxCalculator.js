/**
 * taxCalculator.js
 *
 * Description: This script calculates daily marginal tax rates and generates ICS (iCalendar) files
 * or Google Calendar links for each day of the year 2023 based on a provided monthly salary and 
 * Finnish marginaltax rates.
 *
 * Author: Aarne Leinonen, 2023
 * 
 * Copyright: CCBY 4.0
 * The content is under a Creative Commons Attribution 4.0 International License, allowing sharing 
 * and adaptation with attribution.
 *
 * Powered by GPT-3.5 (OpenAI)
 * Version: 1.0
 */

// Define Finnish marginal tax rates https://www.vero.fi/henkiloasiakkaat/verokortti-ja-veroilmoitus/tulot/ansiotulot/
const marginalTaxRates = [
{maxIncome: 1000, monthlySalary: 80, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 914, minIncome: 0},
{maxIncome: 2000, monthlySalary: 160, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 1827, minIncome: 1000},
{maxIncome: 3000, monthlySalary: 240, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 2741, minIncome: 2000},
{maxIncome: 4000, monthlySalary: 320, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 3654, minIncome: 3000},
{maxIncome: 5000, monthlySalary: 400, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 4568, minIncome: 4000},
{maxIncome: 6000, monthlySalary: 480, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 5481, minIncome: 5000},
{maxIncome: 7000, monthlySalary: 560, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 6395, minIncome: 6000},
{maxIncome: 8000, monthlySalary: 640, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 7308, minIncome: 7000},
{maxIncome: 9000, monthlySalary: 720, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 8222, minIncome: 8000},
{maxIncome: 10000, monthlySalary: 800, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 9135, minIncome: 9000},
{maxIncome: 11000, monthlySalary: 880, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 10049, minIncome: 10000},
{maxIncome: 12000, monthlySalary: 960, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 10962, minIncome: 11000},
{maxIncome: 13000, monthlySalary: 1040, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 11876, minIncome: 12000},
{maxIncome: 14000, monthlySalary: 1120, taxRate: 0.087, marginalTaxRate: 0.087, netIncome: 12789, minIncome: 13000},
{maxIncome: 15000, monthlySalary: 1200, taxRate: 0.087, marginalTaxRate: 0.112, netIncome: 13696, minIncome: 14000},
{maxIncome: 16000, monthlySalary: 1280, taxRate: 0.102, marginalTaxRate: 0.125, netIncome: 14367, minIncome: 15000},
{maxIncome: 17000, monthlySalary: 1360, taxRate: 0.103, marginalTaxRate: 0.125, netIncome: 15242, minIncome: 16000},
{maxIncome: 18000, monthlySalary: 1440, taxRate: 0.109, marginalTaxRate: 0.370, netIncome: 16031, minIncome: 17000},
{maxIncome: 19000, monthlySalary: 1520, taxRate: 0.123, marginalTaxRate: 0.370, netIncome: 16661, minIncome: 18000},
{maxIncome: 20000, monthlySalary: 1600, taxRate: 0.135, marginalTaxRate: 0.370, netIncome: 17290, minIncome: 19000},
{maxIncome: 21000, monthlySalary: 1680, taxRate: 0.147, marginalTaxRate: 0.370, netIncome: 17920, minIncome: 20000},
{maxIncome: 22000, monthlySalary: 1760, taxRate: 0.156, marginalTaxRate: 0.345, netIncome: 18568, minIncome: 21000},
{maxIncome: 23000, monthlySalary: 1840, taxRate: 0.164, marginalTaxRate: 0.366, netIncome: 19218, minIncome: 22000},
{maxIncome: 24000, monthlySalary: 1920, taxRate: 0.173, marginalTaxRate: 0.366, netIncome: 19852, minIncome: 23000},
{maxIncome: 25000, monthlySalary: 2000, taxRate: 0.181, marginalTaxRate: 0.366, netIncome: 20487, minIncome: 24000},
{maxIncome: 26000, monthlySalary: 2080, taxRate: 0.188, marginalTaxRate: 0.366, netIncome: 21121, minIncome: 25000},
{maxIncome: 27000, monthlySalary: 2160, taxRate: 0.194, marginalTaxRate: 0.379, netIncome: 21755, minIncome: 26000},
{maxIncome: 28000, monthlySalary: 2240, taxRate: 0.202, marginalTaxRate: 0.437, netIncome: 22334, minIncome: 27000},
{maxIncome: 29000, monthlySalary: 2320, taxRate: 0.210, marginalTaxRate: 0.436, netIncome: 22898, minIncome: 28000},
{maxIncome: 30000, monthlySalary: 2400, taxRate: 0.218, marginalTaxRate: 0.436, netIncome: 23461, minIncome: 29000},
{maxIncome: 31000, monthlySalary: 2480, taxRate: 0.225, marginalTaxRate: 0.437, netIncome: 24025, minIncome: 30000},
{maxIncome: 32000, monthlySalary: 2560, taxRate: 0.232, marginalTaxRate: 0.407, netIncome: 24588, minIncome: 31000},
{maxIncome: 33000, monthlySalary: 2640, taxRate: 0.237, marginalTaxRate: 0.388, netIncome: 25194, minIncome: 32000},
{maxIncome: 34000, monthlySalary: 2720, taxRate: 0.241, marginalTaxRate: 0.388, netIncome: 25806, minIncome: 33000},
{maxIncome: 35000, monthlySalary: 2800, taxRate: 0.245, marginalTaxRate: 0.388, netIncome: 26418, minIncome: 34000},
{maxIncome: 36000, monthlySalary: 2880, taxRate: 0.249, marginalTaxRate: 0.388, netIncome: 27029, minIncome: 35000},
{maxIncome: 37000, monthlySalary: 2960, taxRate: 0.254, marginalTaxRate: 0.495, netIncome: 27610, minIncome: 36000},
{maxIncome: 38000, monthlySalary: 3040, taxRate: 0.260, marginalTaxRate: 0.495, netIncome: 28115, minIncome: 37000},
{maxIncome: 39000, monthlySalary: 3120, taxRate: 0.266, marginalTaxRate: 0.495, netIncome: 28621, minIncome: 38000},
{maxIncome: 40000, monthlySalary: 3200, taxRate: 0.272, marginalTaxRate: 0.495, netIncome: 29126, minIncome: 39000},
{maxIncome: 41000, monthlySalary: 3280, taxRate: 0.277, marginalTaxRate: 0.495, netIncome: 29631, minIncome: 40000},
{maxIncome: 42000, monthlySalary: 3360, taxRate: 0.282, marginalTaxRate: 0.495, netIncome: 30137, minIncome: 41000},
{maxIncome: 43000, monthlySalary: 3440, taxRate: 0.287, marginalTaxRate: 0.495, netIncome: 30642, minIncome: 42000},
{maxIncome: 44000, monthlySalary: 3520, taxRate: 0.292, marginalTaxRate: 0.495, netIncome: 31148, minIncome: 43000},
{maxIncome: 45000, monthlySalary: 3600, taxRate: 0.297, marginalTaxRate: 0.495, netIncome: 31653, minIncome: 44000},
{maxIncome: 46000, monthlySalary: 3680, taxRate: 0.301, marginalTaxRate: 0.495, netIncome: 32159, minIncome: 45000},
{maxIncome: 47000, monthlySalary: 3760, taxRate: 0.305, marginalTaxRate: 0.495, netIncome: 32664, minIncome: 46000},
{maxIncome: 48000, monthlySalary: 3840, taxRate: 0.309, marginalTaxRate: 0.495, netIncome: 33169, minIncome: 47000},
{maxIncome: 49000, monthlySalary: 3920, taxRate: 0.313, marginalTaxRate: 0.495, netIncome: 33675, minIncome: 48000},
{maxIncome: 50000, monthlySalary: 4000, taxRate: 0.316, marginalTaxRate: 0.495, netIncome: 34180, minIncome: 49000},
{maxIncome: 51000, monthlySalary: 4080, taxRate: 0.320, marginalTaxRate: 0.495, netIncome: 34686, minIncome: 50000},
{maxIncome: 52000, monthlySalary: 4160, taxRate: 0.323, marginalTaxRate: 0.495, netIncome: 35191, minIncome: 51000},
{maxIncome: 53000, monthlySalary: 4240, taxRate: 0.326, marginalTaxRate: 0.495, netIncome: 35697, minIncome: 52000},
{maxIncome: 54000, monthlySalary: 4320, taxRate: 0.330, marginalTaxRate: 0.495, netIncome: 36202, minIncome: 53000},
{maxIncome: 55000, monthlySalary: 4400, taxRate: 0.333, marginalTaxRate: 0.495, netIncome: 36707, minIncome: 54000},
{maxIncome: 56000, monthlySalary: 4480, taxRate: 0.335, marginalTaxRate: 0.495, netIncome: 37213, minIncome: 55000},
{maxIncome: 57000, monthlySalary: 4560, taxRate: 0.338, marginalTaxRate: 0.522, netIncome: 37718, minIncome: 56000},
{maxIncome: 58000, monthlySalary: 4640, taxRate: 0.342, marginalTaxRate: 0.530, netIncome: 38193, minIncome: 57000},
{maxIncome: 59000, monthlySalary: 4720, taxRate: 0.345, marginalTaxRate: 0.530, netIncome: 38663, minIncome: 58000},
{maxIncome: 60000, monthlySalary: 4800, taxRate: 0.348, marginalTaxRate: 0.530, netIncome: 39133, minIncome: 59000},
{maxIncome: 61000, monthlySalary: 4880, taxRate: 0.351, marginalTaxRate: 0.530, netIncome: 39603, minIncome: 60000},
{maxIncome: 62000, monthlySalary: 4960, taxRate: 0.354, marginalTaxRate: 0.530, netIncome: 40073, minIncome: 61000},
{maxIncome: 63000, monthlySalary: 5040, taxRate: 0.356, marginalTaxRate: 0.530, netIncome: 40543, minIncome: 62000},
{maxIncome: 64000, monthlySalary: 5120, taxRate: 0.359, marginalTaxRate: 0.530, netIncome: 41013, minIncome: 63000},
{maxIncome: 65000, monthlySalary: 5200, taxRate: 0.362, marginalTaxRate: 0.530, netIncome: 41483, minIncome: 64000},
{maxIncome: 66000, monthlySalary: 5280, taxRate: 0.364, marginalTaxRate: 0.530, netIncome: 41953, minIncome: 65000},
{maxIncome: 67000, monthlySalary: 5360, taxRate: 0.367, marginalTaxRate: 0.530, netIncome: 42423, minIncome: 66000},
{maxIncome: 68000, monthlySalary: 5440, taxRate: 0.369, marginalTaxRate: 0.530, netIncome: 42893, minIncome: 67000},
{maxIncome: 69000, monthlySalary: 5520, taxRate: 0.372, marginalTaxRate: 0.530, netIncome: 43363, minIncome: 68000},
{maxIncome: 70000, monthlySalary: 5600, taxRate: 0.374, marginalTaxRate: 0.530, netIncome: 43833, minIncome: 69000},
{maxIncome: 71000, monthlySalary: 5680, taxRate: 0.376, marginalTaxRate: 0.522, netIncome: 44305, minIncome: 70000},
{maxIncome: 72000, monthlySalary: 5760, taxRate: 0.378, marginalTaxRate: 0.522, netIncome: 44783, minIncome: 71000},
{maxIncome: 73000, monthlySalary: 5840, taxRate: 0.380, marginalTaxRate: 0.522, netIncome: 45261, minIncome: 72000},
{maxIncome: 74000, monthlySalary: 5920, taxRate: 0.382, marginalTaxRate: 0.522, netIncome: 45739, minIncome: 73000},
{maxIncome: 75000, monthlySalary: 6000, taxRate: 0.384, marginalTaxRate: 0.522, netIncome: 46217, minIncome: 74000},
{maxIncome: 76000, monthlySalary: 6080, taxRate: 0.386, marginalTaxRate: 0.522, netIncome: 46696, minIncome: 75000},
{maxIncome: 77000, monthlySalary: 6160, taxRate: 0.387, marginalTaxRate: 0.522, netIncome: 47174, minIncome: 76000},
{maxIncome: 78000, monthlySalary: 6240, taxRate: 0.389, marginalTaxRate: 0.522, netIncome: 47652, minIncome: 77000},
{maxIncome: 79000, monthlySalary: 6320, taxRate: 0.391, marginalTaxRate: 0.522, netIncome: 48130, minIncome: 78000},
{maxIncome: 80000, monthlySalary: 6400, taxRate: 0.392, marginalTaxRate: 0.522, netIncome: 48608, minIncome: 79000},
{maxIncome: 81000, monthlySalary: 6480, taxRate: 0.394, marginalTaxRate: 0.522, netIncome: 49087, minIncome: 80000},
{maxIncome: 82000, monthlySalary: 6560, taxRate: 0.396, marginalTaxRate: 0.522, netIncome: 49565, minIncome: 81000},
{maxIncome: 83000, monthlySalary: 6640, taxRate: 0.397, marginalTaxRate: 0.522, netIncome: 50043, minIncome: 82000},
{maxIncome: 84000, monthlySalary: 6720, taxRate: 0.399, marginalTaxRate: 0.522, netIncome: 50521, minIncome: 83000},
{maxIncome: 85000, monthlySalary: 6800, taxRate: 0.400, marginalTaxRate: 0.522, netIncome: 50999, minIncome: 84000},
{maxIncome: 86000, monthlySalary: 6880, taxRate: 0.401, marginalTaxRate: 0.522, netIncome: 51478, minIncome: 85000},
{maxIncome: 87000, monthlySalary: 6960, taxRate: 0.403, marginalTaxRate: 0.522, netIncome: 51956, minIncome: 86000},
{maxIncome: 88000, monthlySalary: 7040, taxRate: 0.404, marginalTaxRate: 0.522, netIncome: 52434, minIncome: 87000},
{maxIncome: 89000, monthlySalary: 7120, taxRate: 0.405, marginalTaxRate: 0.522, netIncome: 52912, minIncome: 88000},
{maxIncome: 90000, monthlySalary: 7200, taxRate: 0.407, marginalTaxRate: 0.522, netIncome: 53390, minIncome: 89000},
{maxIncome: 91000, monthlySalary: 7280, taxRate: 0.408, marginalTaxRate: 0.522, netIncome: 53868, minIncome: 90000},
{maxIncome: 92000, monthlySalary: 7360, taxRate: 0.409, marginalTaxRate: 0.522, netIncome: 54347, minIncome: 91000},
{maxIncome: 93000, monthlySalary: 7440, taxRate: 0.410, marginalTaxRate: 0.522, netIncome: 54825, minIncome: 92000},
{maxIncome: 94000, monthlySalary: 7520, taxRate: 0.412, marginalTaxRate: 0.504, netIncome: 55303, minIncome: 93000},
{maxIncome: 95000, monthlySalary: 7600, taxRate: 0.413, marginalTaxRate: 0.502, netIncome: 55799, minIncome: 94000},
{maxIncome: 96000, monthlySalary: 7680, taxRate: 0.414, marginalTaxRate: 0.576, netIncome: 56297, minIncome: 95000},
{maxIncome: 97000, monthlySalary: 7760, taxRate: 0.415, marginalTaxRate: 0.592, netIncome: 56720, minIncome: 96000},
{maxIncome: 98000, monthlySalary: 7840, taxRate: 0.417, marginalTaxRate: 0.592, netIncome: 57128, minIncome: 97000},
{maxIncome: 99000, monthlySalary: 7920, taxRate: 0.419, marginalTaxRate: 0.592, netIncome: 57536, minIncome: 98000},
{maxIncome: 100000, monthlySalary: 8000, taxRate: 0.421, marginalTaxRate: 0.592, netIncome: 57944, minIncome: 99000},
{maxIncome: 101000, monthlySalary: 8080, taxRate: 0.422, marginalTaxRate: 0.592, netIncome: 58351, minIncome: 100000},
{maxIncome: 102000, monthlySalary: 8160, taxRate: 0.424, marginalTaxRate: 0.592, netIncome: 58759, minIncome: 101000},
{maxIncome: 103000, monthlySalary: 8240, taxRate: 0.426, marginalTaxRate: 0.592, netIncome: 59167, minIncome: 102000},
{maxIncome: 104000, monthlySalary: 8320, taxRate: 0.427, marginalTaxRate: 0.592, netIncome: 59574, minIncome: 103000},
{maxIncome: 105000, monthlySalary: 8400, taxRate: 0.429, marginalTaxRate: 0.592, netIncome: 59982, minIncome: 104000},
{maxIncome: 106000, monthlySalary: 8480, taxRate: 0.430, marginalTaxRate: 0.592, netIncome: 60390, minIncome: 105000},
{maxIncome: 107000, monthlySalary: 8560, taxRate: 0.432, marginalTaxRate: 0.592, netIncome: 60797, minIncome: 106000},
{maxIncome: 108000, monthlySalary: 8640, taxRate: 0.433, marginalTaxRate: 0.592, netIncome: 61205, minIncome: 107000},
{maxIncome: 109000, monthlySalary: 8720, taxRate: 0.435, marginalTaxRate: 0.592, netIncome: 61613, minIncome: 108000},
{maxIncome: 110000, monthlySalary: 8800, taxRate: 0.436, marginalTaxRate: 0.592, netIncome: 62021, minIncome: 109000},
{maxIncome: 111000, monthlySalary: 8880, taxRate: 0.438, marginalTaxRate: 0.592, netIncome: 62428, minIncome: 110000},
{maxIncome: 112000, monthlySalary: 8960, taxRate: 0.439, marginalTaxRate: 0.592, netIncome: 62836, minIncome: 111000},
{maxIncome: 113000, monthlySalary: 9040, taxRate: 0.440, marginalTaxRate: 0.592, netIncome: 63244, minIncome: 112000},
{maxIncome: 114000, monthlySalary: 9120, taxRate: 0.442, marginalTaxRate: 0.592, netIncome: 63651, minIncome: 113000},
{maxIncome: 115000, monthlySalary: 9200, taxRate: 0.443, marginalTaxRate: 0.592, netIncome: 64059, minIncome: 114000},
{maxIncome: 116000, monthlySalary: 9280, taxRate: 0.444, marginalTaxRate: 0.592, netIncome: 64467, minIncome: 115000},
{maxIncome: 117000, monthlySalary: 9360, taxRate: 0.446, marginalTaxRate: 0.592, netIncome: 64874, minIncome: 116000},
{maxIncome: 118000, monthlySalary: 9440, taxRate: 0.447, marginalTaxRate: 0.592, netIncome: 65282, minIncome: 117000},
{maxIncome: 119000, monthlySalary: 9520, taxRate: 0.448, marginalTaxRate: 0.592, netIncome: 65690, minIncome: 118000},
{maxIncome: 120000, monthlySalary: 9600, taxRate: 0.449, marginalTaxRate: 0.592, netIncome: 66098, minIncome: 119000},
{maxIncome: 121000, monthlySalary: 9680, taxRate: 0.450, marginalTaxRate: 0.592, netIncome: 66505, minIncome: 120000},
{maxIncome: 122000, monthlySalary: 9760, taxRate: 0.452, marginalTaxRate: 0.592, netIncome: 66913, minIncome: 121000},
{maxIncome: 123000, monthlySalary: 9840, taxRate: 0.453, marginalTaxRate: 0.592, netIncome: 67321, minIncome: 122000},
{maxIncome: 124000, monthlySalary: 9920, taxRate: 0.454, marginalTaxRate: 0.592, netIncome: 67728, minIncome: 123000},
{maxIncome: 125000, monthlySalary: 10000, taxRate: 0.455, marginalTaxRate: 0.592, netIncome: 68136, minIncome: 124000},
{maxIncome: 126000, monthlySalary: 10080, taxRate: 0.456, marginalTaxRate: 0.592, netIncome: 68544, minIncome: 125000},
{maxIncome: 127000, monthlySalary: 10160, taxRate: 0.457, marginalTaxRate: 0.592, netIncome: 68952, minIncome: 126000},
{maxIncome: 128000, monthlySalary: 10240, taxRate: 0.458, marginalTaxRate: 0.592, netIncome: 69359, minIncome: 127000},
{maxIncome: 129000, monthlySalary: 10320, taxRate: 0.459, marginalTaxRate: 0.592, netIncome: 69767, minIncome: 128000},
{maxIncome: 130000, monthlySalary: 10400, taxRate: 0.460, marginalTaxRate: 0.592, netIncome: 70175, minIncome: 129000},
{maxIncome: 131000, monthlySalary: 10480, taxRate: 0.461, marginalTaxRate: 0.592, netIncome: 70582, minIncome: 130000},
{maxIncome: 132000, monthlySalary: 10560, taxRate: 0.462, marginalTaxRate: 0.592, netIncome: 70990, minIncome: 131000},
{maxIncome: 133000, monthlySalary: 10640, taxRate: 0.463, marginalTaxRate: 0.592, netIncome: 71398, minIncome: 132000},
{maxIncome: 134000, monthlySalary: 10720, taxRate: 0.464, marginalTaxRate: 0.592, netIncome: 71805, minIncome: 133000},
{maxIncome: 135000, monthlySalary: 10800, taxRate: 0.465, marginalTaxRate: 0.592, netIncome: 72213, minIncome: 134000},
{maxIncome: 136000, monthlySalary: 10880, taxRate: 0.466, marginalTaxRate: 0.592, netIncome: 72621, minIncome: 135000},
{maxIncome: 137000, monthlySalary: 10960, taxRate: 0.467, marginalTaxRate: 0.592, netIncome: 73029, minIncome: 136000},
{maxIncome: 138000, monthlySalary: 11040, taxRate: 0.468, marginalTaxRate: 0.592, netIncome: 73436, minIncome: 137000},
{maxIncome: 139000, monthlySalary: 11120, taxRate: 0.469, marginalTaxRate: 0.592, netIncome: 73844, minIncome: 138000},
{maxIncome: 140000, monthlySalary: 11200, taxRate: 0.470, marginalTaxRate: 0.592, netIncome: 74252, minIncome: 139000},
{maxIncome: 141000, monthlySalary: 11280, taxRate: 0.471, marginalTaxRate: 0.592, netIncome: 74659, minIncome: 140000},
{maxIncome: 142000, monthlySalary: 11360, taxRate: 0.471, marginalTaxRate: 0.592, netIncome: 75067, minIncome: 141000},
{maxIncome: 143000, monthlySalary: 11440, taxRate: 0.472, marginalTaxRate: 0.592, netIncome: 75475, minIncome: 142000},
{maxIncome: 144000, monthlySalary: 11520, taxRate: 0.473, marginalTaxRate: 0.592, netIncome: 75882, minIncome: 143000},
{maxIncome: 145000, monthlySalary: 11600, taxRate: 0.474, marginalTaxRate: 0.592, netIncome: 76290, minIncome: 144000},
{maxIncome: 146000, monthlySalary: 11680, taxRate: 0.475, marginalTaxRate: 0.592, netIncome: 76698, minIncome: 145000},
{maxIncome: 147000, monthlySalary: 11760, taxRate: 0.475, marginalTaxRate: 0.592, netIncome: 77106, minIncome: 146000},
{maxIncome: 148000, monthlySalary: 11840, taxRate: 0.476, marginalTaxRate: 0.592, netIncome: 77513, minIncome: 147000},
{maxIncome: 149000, monthlySalary: 11920, taxRate: 0.477, marginalTaxRate: 0.592, netIncome: 77921, minIncome: 148000},
{maxIncome: 150000, monthlySalary: 12000, taxRate: 0.478, marginalTaxRate: 0.592, netIncome: 78329, minIncome: 149000},
{maxIncome: 151000, monthlySalary: 12080, taxRate: 0.479, marginalTaxRate: 0.592, netIncome: 78736, minIncome: 150000},
{maxIncome: 152000, monthlySalary: 12160, taxRate: 0.479, marginalTaxRate: 0.592, netIncome: 79144, minIncome: 151000},
{maxIncome: 153000, monthlySalary: 12240, taxRate: 0.480, marginalTaxRate: 0.592, netIncome: 79552, minIncome: 152000},
{maxIncome: 154000, monthlySalary: 12320, taxRate: 0.481, marginalTaxRate: 0.592, netIncome: 79960, minIncome: 153000},
{maxIncome: 155000, monthlySalary: 12400, taxRate: 0.482, marginalTaxRate: 0.592, netIncome: 80367, minIncome: 154000},
{maxIncome: 156000, monthlySalary: 12480, taxRate: 0.482, marginalTaxRate: 0.592, netIncome: 80775, minIncome: 155000},
{maxIncome: 157000, monthlySalary: 12560, taxRate: 0.483, marginalTaxRate: 0.588, netIncome: 81183, minIncome: 156000},
{maxIncome: 158000, monthlySalary: 12640, taxRate: 0.484, marginalTaxRate: 0.580, netIncome: 81590, minIncome: 157000},
{maxIncome: 159000, monthlySalary: 12720, taxRate: 0.484, marginalTaxRate: 0.580, netIncome: 82010, minIncome: 158000},
{maxIncome: 160000, monthlySalary: 12800, taxRate: 0.485, marginalTaxRate: 0.580, netIncome: 82430, minIncome: 159000},
{maxIncome: 161000, monthlySalary: 12880, taxRate: 0.485, marginalTaxRate: 0.580, netIncome: 82850, minIncome: 160000},
{maxIncome: 162000, monthlySalary: 12960, taxRate: 0.486, marginalTaxRate: 0.580, netIncome: 83270, minIncome: 161000},
{maxIncome: 163000, monthlySalary: 13040, taxRate: 0.487, marginalTaxRate: 0.580, netIncome: 83689, minIncome: 162000},
{maxIncome: 164000, monthlySalary: 13120, taxRate: 0.487, marginalTaxRate: 0.580, netIncome: 84109, minIncome: 163000},
{maxIncome: 165000, monthlySalary: 13200, taxRate: 0.488, marginalTaxRate: 0.580, netIncome: 84529, minIncome: 164000},
{maxIncome: 166000, monthlySalary: 13280, taxRate: 0.488, marginalTaxRate: 0.580, netIncome: 84949, minIncome: 165000},
{maxIncome: 167000, monthlySalary: 13360, taxRate: 0.489, marginalTaxRate: 0.580, netIncome: 85369, minIncome: 166000},
{maxIncome: 168000, monthlySalary: 13440, taxRate: 0.489, marginalTaxRate: 0.580, netIncome: 85788, minIncome: 167000},
{maxIncome: 169000, monthlySalary: 13520, taxRate: 0.490, marginalTaxRate: 0.580, netIncome: 86208, minIncome: 168000},
{maxIncome: 170000, monthlySalary: 13600, taxRate: 0.490, marginalTaxRate: 0.580, netIncome: 86628, minIncome: 169000},
{maxIncome: 171000, monthlySalary: 13680, taxRate: 0.491, marginalTaxRate: 0.580, netIncome: 87048, minIncome: 170000},
{maxIncome: 172000, monthlySalary: 13760, taxRate: 0.491, marginalTaxRate: 0.580, netIncome: 87468, minIncome: 171000},
{maxIncome: 173000, monthlySalary: 13840, taxRate: 0.492, marginalTaxRate: 0.580, netIncome: 87887, minIncome: 172000},
{maxIncome: 174000, monthlySalary: 13920, taxRate: 0.492, marginalTaxRate: 0.580, netIncome: 88307, minIncome: 173000},
{maxIncome: 175000, monthlySalary: 14000, taxRate: 0.493, marginalTaxRate: 0.580, netIncome: 88727, minIncome: 174000},
{maxIncome: 176000, monthlySalary: 14080, taxRate: 0.493, marginalTaxRate: 0.580, netIncome: 89147, minIncome: 175000},
{maxIncome: 177000, monthlySalary: 14160, taxRate: 0.494, marginalTaxRate: 0.580, netIncome: 89567, minIncome: 176000},
{maxIncome: 178000, monthlySalary: 14240, taxRate: 0.494, marginalTaxRate: 0.580, netIncome: 89987, minIncome: 177000},
{maxIncome: 179000, monthlySalary: 14320, taxRate: 0.495, marginalTaxRate: 0.580, netIncome: 90406, minIncome: 178000},
{maxIncome: 180000, monthlySalary: 14400, taxRate: 0.495, marginalTaxRate: 0.580, netIncome: 90826, minIncome: 179000},
{maxIncome: 181000, monthlySalary: 14480, taxRate: 0.496, marginalTaxRate: 0.580, netIncome: 91246, minIncome: 180000},
{maxIncome: 182000, monthlySalary: 14560, taxRate: 0.496, marginalTaxRate: 0.580, netIncome: 91666, minIncome: 181000},
{maxIncome: 183000, monthlySalary: 14640, taxRate: 0.497, marginalTaxRate: 0.580, netIncome: 92086, minIncome: 182000},
{maxIncome: 184000, monthlySalary: 14720, taxRate: 0.497, marginalTaxRate: 0.580, netIncome: 92505, minIncome: 183000},
{maxIncome: 185000, monthlySalary: 14800, taxRate: 0.498, marginalTaxRate: 0.580, netIncome: 92925, minIncome: 184000},
{maxIncome: 186000, monthlySalary: 14880, taxRate: 0.498, marginalTaxRate: 0.580, netIncome: 93345, minIncome: 185000},
{maxIncome: 187000, monthlySalary: 14960, taxRate: 0.499, marginalTaxRate: 0.580, netIncome: 93765, minIncome: 186000},
{maxIncome: 188000, monthlySalary: 15040, taxRate: 0.499, marginalTaxRate: 0.580, netIncome: 94185, minIncome: 187000},
{maxIncome: 189000, monthlySalary: 15120, taxRate: 0.499, marginalTaxRate: 0.580, netIncome: 94604, minIncome: 188000},
{maxIncome: 190000, monthlySalary: 15200, taxRate: 0.500, marginalTaxRate: 0.580, netIncome: 95024, minIncome: 189000},
{maxIncome: 191000, monthlySalary: 15280, taxRate: 0.500, marginalTaxRate: 0.580, netIncome: 95444, minIncome: 190000},
{maxIncome: 192000, monthlySalary: 15360, taxRate: 0.501, marginalTaxRate: 0.580, netIncome: 95864, minIncome: 191000},
{maxIncome: 193000, monthlySalary: 15440, taxRate: 0.501, marginalTaxRate: 0.580, netIncome: 96284, minIncome: 192000},
{maxIncome: 194000, monthlySalary: 15520, taxRate: 0.502, marginalTaxRate: 0.580, netIncome: 96703, minIncome: 193000},
{maxIncome: 195000, monthlySalary: 15600, taxRate: 0.502, marginalTaxRate: 0.580, netIncome: 97123, minIncome: 194000},
{maxIncome: 196000, monthlySalary: 15680, taxRate: 0.502, marginalTaxRate: 0.580, netIncome: 97543, minIncome: 195000},
{maxIncome: 197000, monthlySalary: 15760, taxRate: 0.503, marginalTaxRate: 0.580, netIncome: 97963, minIncome: 196000},
{maxIncome: 198000, monthlySalary: 15840, taxRate: 0.503, marginalTaxRate: 0.580, netIncome: 98383, minIncome: 197000},
{maxIncome: 199000, monthlySalary: 15920, taxRate: 0.504, marginalTaxRate: 0.580, netIncome: 98802, minIncome: 198000},
{maxIncome: 200000, monthlySalary: 16000, taxRate: 0.504, marginalTaxRate: 0.580, netIncome: 99222, minIncome: 199000},
{maxIncome: 205000, monthlySalary: 16400, taxRate: 0.506, marginalTaxRate: 0.580, netIncome: 101321, minIncome: 200000},
{maxIncome: 210000, monthlySalary: 16800, taxRate: 0.508, marginalTaxRate: 0.580, netIncome: 103420, minIncome: 205000},
{maxIncome: 215000, monthlySalary: 17200, taxRate: 0.509, marginalTaxRate: 0.580, netIncome: 105519, minIncome: 210000},
{maxIncome: 220000, monthlySalary: 17600, taxRate: 0.511, marginalTaxRate: 0.580, netIncome: 107618, minIncome: 215000},
{maxIncome: 225000, monthlySalary: 18000, taxRate: 0.512, marginalTaxRate: 0.580, netIncome: 109717, minIncome: 220000},
{maxIncome: 230000, monthlySalary: 18400, taxRate: 0.514, marginalTaxRate: 0.580, netIncome: 111816, minIncome: 225000},
{maxIncome: 235000, monthlySalary: 18800, taxRate: 0.515, marginalTaxRate: 0.580, netIncome: 113915, minIncome: 230000},
{maxIncome: 240000, monthlySalary: 19200, taxRate: 0.517, marginalTaxRate: 0.580, netIncome: 116014, minIncome: 235000},
{maxIncome: 245000, monthlySalary: 19600, taxRate: 0.518, marginalTaxRate: 0.580, netIncome: 118113, minIncome: 240000},
{maxIncome: 250000, monthlySalary: 20000, taxRate: 0.519, marginalTaxRate: 0.580, netIncome: 120212, minIncome: 245000},
{maxIncome: 255000, monthlySalary: 20400, taxRate: 0.520, marginalTaxRate: 0.580, netIncome: 122311, minIncome: 250000},
{maxIncome: 260000, monthlySalary: 20800, taxRate: 0.521, marginalTaxRate: 0.580, netIncome: 124410, minIncome: 255000},
{maxIncome: 265000, monthlySalary: 21200, taxRate: 0.523, marginalTaxRate: 0.580, netIncome: 126509, minIncome: 260000},
{maxIncome: 270000, monthlySalary: 21600, taxRate: 0.524, marginalTaxRate: 0.580, netIncome: 128608, minIncome: 265000},
{maxIncome: 275000, monthlySalary: 22000, taxRate: 0.525, marginalTaxRate: 0.580, netIncome: 130707, minIncome: 270000},
{maxIncome: 280000, monthlySalary: 22400, taxRate: 0.526, marginalTaxRate: 0.580, netIncome: 132806, minIncome: 275000},
{maxIncome: 285000, monthlySalary: 22800, taxRate: 0.527, marginalTaxRate: 0.580, netIncome: 134905, minIncome: 280000},
{maxIncome: 290000, monthlySalary: 23200, taxRate: 0.528, marginalTaxRate: 0.580, netIncome: 137004, minIncome: 285000},
{maxIncome: 295000, monthlySalary: 23600, taxRate: 0.528, marginalTaxRate: 0.580, netIncome: 139104, minIncome: 290000},
{maxIncome: 300000, monthlySalary: 24000, taxRate: 0.529, marginalTaxRate: 0.580, netIncome: 141203, minIncome: 295000},
{maxIncome: 305000, monthlySalary: 24400, taxRate: 0.530, marginalTaxRate: 0.580, netIncome: 143302, minIncome: 300000},
{maxIncome: 310000, monthlySalary: 24800, taxRate: 0.531, marginalTaxRate: 0.580, netIncome: 145401, minIncome: 305000},
{maxIncome: 315000, monthlySalary: 25200, taxRate: 0.532, marginalTaxRate: 0.580, netIncome: 147500, minIncome: 310000},
{maxIncome: 320000, monthlySalary: 25600, taxRate: 0.533, marginalTaxRate: 0.580, netIncome: 149599, minIncome: 315000},
{maxIncome: 325000, monthlySalary: 26000, taxRate: 0.533, marginalTaxRate: 0.580, netIncome: 151698, minIncome: 320000},
{maxIncome: 330000, monthlySalary: 26400, taxRate: 0.534, marginalTaxRate: 0.580, netIncome: 153797, minIncome: 325000},
{maxIncome: 335000, monthlySalary: 26800, taxRate: 0.535, marginalTaxRate: 0.580, netIncome: 155896, minIncome: 330000},
{maxIncome: 340000, monthlySalary: 27200, taxRate: 0.535, marginalTaxRate: 0.580, netIncome: 157995, minIncome: 335000},
{maxIncome: 345000, monthlySalary: 27600, taxRate: 0.536, marginalTaxRate: 0.580, netIncome: 160094, minIncome: 340000},
{maxIncome: 350000, monthlySalary: 28000, taxRate: 0.537, marginalTaxRate: 0.580, netIncome: 162193, minIncome: 345000},
{maxIncome: 355000, monthlySalary: 28400, taxRate: 0.537, marginalTaxRate: 0.580, netIncome: 164292, minIncome: 350000},
{maxIncome: 360000, monthlySalary: 28800, taxRate: 0.538, marginalTaxRate: 0.580, netIncome: 166391, minIncome: 355000},
{maxIncome: 365000, monthlySalary: 29200, taxRate: 0.538, marginalTaxRate: 0.580, netIncome: 168490, minIncome: 360000},
{maxIncome: 370000, monthlySalary: 29600, taxRate: 0.539, marginalTaxRate: 0.580, netIncome: 170589, minIncome: 365000},
{maxIncome: 375000, monthlySalary: 30000, taxRate: 0.539, marginalTaxRate: 0.580, netIncome: 172688, minIncome: 370000},
{maxIncome: 380000, monthlySalary: 30400, taxRate: 0.540, marginalTaxRate: 0.580, netIncome: 174787, minIncome: 375000},
{maxIncome: 385000, monthlySalary: 30800, taxRate: 0.541, marginalTaxRate: 0.580, netIncome: 176886, minIncome: 380000},
{maxIncome: 390000, monthlySalary: 31200, taxRate: 0.541, marginalTaxRate: 0.580, netIncome: 178985, minIncome: 385000},
{maxIncome: 395000, monthlySalary: 31600, taxRate: 0.542, marginalTaxRate: 0.580, netIncome: 181084, minIncome: 390000},
{maxIncome: 400000, monthlySalary: 32000, taxRate: 0.542, marginalTaxRate: 0.580, netIncome: 183183, minIncome: 395000},
{maxIncome: 405000, monthlySalary: 32400, taxRate: 0.543, marginalTaxRate: 0.580, netIncome: 185282, minIncome: 400000},
{maxIncome: 410000, monthlySalary: 32800, taxRate: 0.543, marginalTaxRate: 0.580, netIncome: 187381, minIncome: 405000},
{maxIncome: 415000, monthlySalary: 33200, taxRate: 0.543, marginalTaxRate: 0.580, netIncome: 189480, minIncome: 410000},
{maxIncome: 420000, monthlySalary: 33600, taxRate: 0.544, marginalTaxRate: 0.580, netIncome: 191579, minIncome: 415000},
{maxIncome: 425000, monthlySalary: 34000, taxRate: 0.544, marginalTaxRate: 0.580, netIncome: 193678, minIncome: 420000},
{maxIncome: 430000, monthlySalary: 34400, taxRate: 0.545, marginalTaxRate: 0.580, netIncome: 195777, minIncome: 425000},
{maxIncome: 435000, monthlySalary: 34800, taxRate: 0.545, marginalTaxRate: 0.580, netIncome: 197876, minIncome: 430000},
{maxIncome: 440000, monthlySalary: 35200, taxRate: 0.546, marginalTaxRate: 0.580, netIncome: 199975, minIncome: 435000},
{maxIncome: 445000, monthlySalary: 35600, taxRate: 0.546, marginalTaxRate: 0.580, netIncome: 202074, minIncome: 440000},
{maxIncome: 450000, monthlySalary: 36000, taxRate: 0.546, marginalTaxRate: 0.580, netIncome: 204173, minIncome: 445000},
{maxIncome: 455000, monthlySalary: 36400, taxRate: 0.547, marginalTaxRate: 0.580, netIncome: 206272, minIncome: 450000},
{maxIncome: 460000, monthlySalary: 36800, taxRate: 0.547, marginalTaxRate: 0.580, netIncome: 208371, minIncome: 455000},
{maxIncome: 465000, monthlySalary: 37200, taxRate: 0.547, marginalTaxRate: 0.580, netIncome: 210470, minIncome: 460000},
{maxIncome: 470000, monthlySalary: 37600, taxRate: 0.548, marginalTaxRate: 0.580, netIncome: 212569, minIncome: 465000},
{maxIncome: 475000, monthlySalary: 38000, taxRate: 0.548, marginalTaxRate: 0.580, netIncome: 214668, minIncome: 470000},
{maxIncome: 480000, monthlySalary: 38400, taxRate: 0.548, marginalTaxRate: 0.580, netIncome: 216767, minIncome: 475000},
{maxIncome: 485000, monthlySalary: 38800, taxRate: 0.549, marginalTaxRate: 0.580, netIncome: 218866, minIncome: 480000},
{maxIncome: 490000, monthlySalary: 39200, taxRate: 0.549, marginalTaxRate: 0.580, netIncome: 220965, minIncome: 485000},
{maxIncome: 495000, monthlySalary: 39600, taxRate: 0.549, marginalTaxRate: 0.580, netIncome: 223064, minIncome: 490000},
{maxIncome: 500000, monthlySalary: 40000, taxRate: 0.550, marginalTaxRate: 0.580, netIncome: 225163, minIncome: 495000},
{maxIncome: 505000, monthlySalary: 40400, taxRate: 0.550, marginalTaxRate: 0.580, netIncome: 227262, minIncome: 500000},
{maxIncome: 510000, monthlySalary: 40800, taxRate: 0.550, marginalTaxRate: 0.580, netIncome: 229361, minIncome: 505000},
{maxIncome: 515000, monthlySalary: 41200, taxRate: 0.551, marginalTaxRate: 0.580, netIncome: 231460, minIncome: 510000},
{maxIncome: 520000, monthlySalary: 41600, taxRate: 0.551, marginalTaxRate: 0.580, netIncome: 233559, minIncome: 515000},
{maxIncome: 525000, monthlySalary: 42000, taxRate: 0.551, marginalTaxRate: 0.580, netIncome: 235658, minIncome: 520000},
{maxIncome: 530000, monthlySalary: 42400, taxRate: 0.551, marginalTaxRate: 0.580, netIncome: 237757, minIncome: 525000},
{maxIncome: 535000, monthlySalary: 42800, taxRate: 0.552, marginalTaxRate: 0.580, netIncome: 239856, minIncome: 530000},
{maxIncome: 540000, monthlySalary: 43200, taxRate: 0.552, marginalTaxRate: 0.580, netIncome: 241955, minIncome: 535000},
{maxIncome: 545000, monthlySalary: 43600, taxRate: 0.552, marginalTaxRate: 0.580, netIncome: 244054, minIncome: 540000},
{maxIncome: 550000, monthlySalary: 44000, taxRate: 0.552, marginalTaxRate: 0.580, netIncome: 246153, minIncome: 545000},
{maxIncome: 555000, monthlySalary: 44400, taxRate: 0.553, marginalTaxRate: 0.580, netIncome: 248252, minIncome: 550000},
{maxIncome: 560000, monthlySalary: 44800, taxRate: 0.553, marginalTaxRate: 0.580, netIncome: 250351, minIncome: 555000},
{maxIncome: 565000, monthlySalary: 45200, taxRate: 0.553, marginalTaxRate: 0.580, netIncome: 252450, minIncome: 560000},
{maxIncome: 570000, monthlySalary: 45600, taxRate: 0.553, marginalTaxRate: 0.580, netIncome: 254549, minIncome: 565000},
{maxIncome: 575000, monthlySalary: 46000, taxRate: 0.554, marginalTaxRate: 0.580, netIncome: 256648, minIncome: 570000},
{maxIncome: 580000, monthlySalary: 46400, taxRate: 0.554, marginalTaxRate: 0.580, netIncome: 258747, minIncome: 575000},
{maxIncome: 585000, monthlySalary: 46800, taxRate: 0.554, marginalTaxRate: 0.580, netIncome: 260846, minIncome: 580000},
{maxIncome: 590000, monthlySalary: 47200, taxRate: 0.554, marginalTaxRate: 0.580, netIncome: 262945, minIncome: 585000},
{maxIncome: 595000, monthlySalary: 47600, taxRate: 0.555, marginalTaxRate: 0.580, netIncome: 265045, minIncome: 590000},
{maxIncome: 600000, monthlySalary: 48000, taxRate: 0.555, marginalTaxRate: 0.580, netIncome: 267144, minIncome: 595000},
{maxIncome: 650000, monthlySalary: 52000, taxRate: 0.557, marginalTaxRate: 0.580, netIncome: 288134, minIncome: 600000},
{maxIncome: 700000, monthlySalary: 56000, taxRate: 0.558, marginalTaxRate: 0.580, netIncome: 309124, minIncome: 650000},
{maxIncome: 750000, monthlySalary: 60000, taxRate: 0.560, marginalTaxRate: 0.580, netIncome: 330114, minIncome: 700000},
{maxIncome: 800000, monthlySalary: 64000, taxRate: 0.561, marginalTaxRate: 0.580, netIncome: 351104, minIncome: 750000},
{maxIncome: 850000, monthlySalary: 68000, taxRate: 0.562, marginalTaxRate: 0.580, netIncome: 372094, minIncome: 800000},
{maxIncome: 900000, monthlySalary: 72000, taxRate: 0.563, marginalTaxRate: 0.580, netIncome: 393085, minIncome: 850000},
{maxIncome: 950000, monthlySalary: 76000, taxRate: 0.564, marginalTaxRate: 0.580, netIncome: 414075, minIncome: 900000},
{maxIncome: 1000000, monthlySalary: 80000, taxRate: 0.565, marginalTaxRate: 0.580, netIncome: 43506, minIncome: 950000}
];

/**
 * Calculates and displays daily marginal tax rates based on a monthly salary input.
 * Generates a tax table for each day of the year, providing tax rates and options to download or add events to Google Calendar.
 */
function calculateTax() {
    const salaryInput = document.getElementById("salaryInput");
    const salary = parseFloat(salaryInput.value);

    if (isNaN(salary) || salary <= 0) {
        alert("Please enter a valid monthly salary.");
        return;
    }

    const taxTable = document.getElementById("taxTable");
    taxTable.innerHTML = ""; // Clear previous results

    let cumulativeIncome = 0;
    let cumulativeTax = 0;

    // Create and populate the tax table
    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
            <th>Päivä</th>
            <th>Marginaaliveroaste (%)</th>
            <th>Lisää kalenteriin</th>
        </tr>
    `;

    const startDate = new Date("2023-01-01");
    const endDate = new Date("2023-12-31");

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split("T")[0];

        // Calculate the daily income
        const dailyIncome = salary / 30; // Assuming an average of 30 days per month

        // Calculate the daily tax based on the daily income and cumulative tax
        const applicableRate = findApplicableTaxRate(cumulativeIncome);
        const dailyTax = dailyIncome * applicableRate;

        // Update cumulative income and cumulative tax
        cumulativeIncome += dailyIncome;
        cumulativeTax += dailyTax;

        // Calculate the marginal tax rate for the day
        const marginalTaxRate = (dailyTax / dailyIncome) * 100;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${dateString}</td>
            <td>${marginalTaxRate.toFixed(2)}</td>
            <td></td>
        `;

        const downloadButtonCell = row.querySelector("td:last-child");
        downloadButtonCell.appendChild(createDownloadButton(dateString, marginalTaxRate));

        const addToGoogleCalendarButtonCell = row.querySelector("td:last-child");
        addToGoogleCalendarButtonCell.appendChild(createGoogleCalendarButton(dateString, marginalTaxRate));

        table.appendChild(row);
    }

    taxTable.appendChild(table);

}

/**
 * Finds and returns the applicable marginal tax rate based on the given income.
 *
 * @param {number} income - The cumulative income for which to determine the marginal tax rate.
 * @returns {number} - The applicable marginal tax rate as a decimal (e.g., 0.123 for 12.3%).
 */
function findApplicableTaxRate(income) {
    for (const rate of marginalTaxRates) {
        if (income >= rate.minIncome && income < rate.maxIncome) {
            return rate.marginalTaxRate;
        }
    }
    return 0;
}

/**
 * Generates an ICS (iCalendar) file with event details for a specific date and tax rate.
 *
 * @param {string} date - The date for the event in "YYYY-MM-DD" format.
 * @param {number} taxRate - The marginal tax rate as a decimal number (e.g., 0.123 for 12.3%).
 * @returns {string} - A data URI containing the ICS content.
 */
function generateICSFile(date, taxRate) {
    // Format the date in ISO 8601 date format (e.g., "20240103")
    const formattedDate = date.replace(/-/g, '');

    // Generate the DTSTAMP (timestamp) for the ICS file
    const dtstamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, -5);

    // Include the description content
    const description = `Päivän marginaaliveroasteesi on ${taxRate.toFixed(1)} %. Tänään työstäsi jää käteen vain ${100 - taxRate} %. Äänestä vaaleissa Liberaalipuolue - Vapaus valita jotta sitä jäisi enemmän.`;

    // Construct the ICS content in string format
    const icsContent = `BEGIN:VCALENDAR
PRODID:-//Example Corp.//CalDAV Client//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${formattedDate}
DTSTAMP:${dtstamp}
DTSTART:${formattedDate}
DTEND:${formattedDate}
SUMMARY:${taxRate.toFixed(1)} % marginaaliveroaste
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

    // Create a data URI for the ICS content
    const dataURI = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
    
    return dataURI;
}

/**
 * Creates a button element that, when clicked, allows users to download an ICS file.
 *
 * @param {string} date - The date for the event in "YYYY-MM-DD" format.
 * @param {number} taxRate - The marginal tax rate as a decimal number (e.g., 0.123 for 12.3%).
 * @returns {HTMLButtonElement} - A button element that triggers the ICS file download when clicked.
 */
function createDownloadButton(date, taxRate) {
    const button = document.createElement("button");
    button.textContent = "Download ICS";
    button.addEventListener("click", function () {
        const dataURI = generateICSFile(date, taxRate);

        // Create an anchor element to trigger the download
        const downloadLink = document.createElement("a");
        downloadLink.href = dataURI;
        downloadLink.download = `tax_${date}.ics`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink); // Clean up the anchor element
    });
    return button;
}

/**
 * Creates a button element that, when clicked, adds an event to Google Calendar.
 *
 * @param {string} date - The date for the event in "YYYY-MM-DD" format.
 * @param {number} taxRate - The marginal tax rate as a decimal number (e.g., 0.123 for 12.3%).
 * @returns {HTMLButtonElement} - A button element that triggers the Google Calendar event creation when clicked.
 */
function createGoogleCalendarButton(date, taxRate) {
    const button = document.createElement("button");
    button.textContent = "Add to Google Calendar";
    button.addEventListener("click", function () {
        // Create a Google Calendar event URL with pre-filled details
        const googleCalendarUrl = generateGoogleCalendarUrl(date, taxRate);
        
        // Open a new tab/window with the Google Calendar URL
        window.open(googleCalendarUrl, '_blank');
    });
    return button;
}

/**
 * Generates a Google Calendar URL for creating an event with a specific tax rate.
 *
 * @param {string} date - The date for the event in "YYYY-MM-DD" format.
 * @param {number} taxRate - The marginal tax rate as a decimal number (e.g., 0.123 for 12.3%).
 * @returns {string} - A Google Calendar URL for creating the event.
 */
function generateGoogleCalendarUrl(date, taxRate) {
    // Format the date in ISO 8601 date format (e.g., "20240103")
    const formattedDate = date.replace(/-/g, '');

    // Include the event details in the Google Calendar URL
    const eventDetails = encodeURIComponent(`Päivän marginaaliveroasteesi on ${taxRate.toFixed(1)} %.\nTänään työstäsi jää käteen vain ${100 - taxRate} %. Äänestä vaaleissa Liberaalipuolue - Vapaus valita jotta sitä jäisi enemmän.`);

    // Google Calendar event creation URL format
    const googleCalendarUrl = `https://www.google.com/calendar/event?action=TEMPLATE&text=${taxRate.toFixed(1)}%20%25%20marginaaliveroaste&dates=${formattedDate}/${formattedDate}&details=${eventDetails}&location=&trp=false`;

    return googleCalendarUrl;
}