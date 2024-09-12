import React, { useState } from 'react';
import {
  Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Text,
  Card, CardBody, CardHeader, Button, Input, useMediaQuery, useColorModeValue
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface AnalyticsCardProps {
  title: string;
  content?: React.ReactNode;
}

type Expense = {
  date: string;
  amount: number;
};

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title }) => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { date: "2023-01", amount: 500 },
    { date: "2023-02", amount: 300 },
    { date: "2023-03", amount: 600 },
    { date: "2023-04", amount: 400 },
    { date: "2023-05", amount: 550 },
  ]);
  const [newExpense, setNewExpense] = useState<Expense>({ date: "", amount: 0 });
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardColor = useColorModeValue('black', 'white');

  // Function to handle adding new expense
  const handleAddExpense = () => {
    if (newExpense.date && newExpense.amount > 0) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({ date: "", amount: 0 });
    }
  };

  return (
    <Card bg={cardBg} color={cardColor} p={4} boxShadow="md">
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
      </CardHeader>

      <CardBody>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenses} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill={useColorModeValue("#3182CE", "#90CDF4")} />
          </BarChart>
        </ResponsiveContainer>

        <StatGroup mt={4}>
          <Stat>
            <StatLabel>Total Cost for requests</StatLabel>
            <StatNumber>
              Ksh. {expenses.reduce((acc, curr) => acc + curr.amount, 0)}
            </StatNumber>
          </Stat>
        </StatGroup>

      
      </CardBody>
    </Card>
  );
};

export default AnalyticsCard;
