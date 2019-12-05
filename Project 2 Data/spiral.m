NPOINTS = 1500;
range = linspace(1, pi*6, NPOINTS);

x = cos(range) + random('unif', -1, 1, 1, NPOINTS) * 0.3;
y = sin(range) + random('unif', -1, 1, 1, NPOINTS) * 0.3;
z = range + random('unif', -1, 1, 1, NPOINTS) * 0.1;

name = cell(1,NPOINTS);
for i=1:NPOINTS
    name{i} = sprintf('Point #%d', i);
end

scatter3(x, y, range);

shuford = randperm(NPOINTS);
jsontable = table(name(shuford)', x(shuford)', y(shuford)', z(shuford)', 'VariableNames', {'name', 'x', 'y', 'z'});
jsonout = jsonencode(jsontable);